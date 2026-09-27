require("dotenv").config();
const { routeQuery } = require("./ai/query-router.service");
const { dispatchSources } = require("./ai/dispatcher.service");
const { generateAnswer } = require("./ai/answer-generator.service");
const { retrieveRelevantChunks } = require("../../rag/retrieval/retriever");

const { buildRagContext } = require("../../rag/retrieval/context-builder");
const answerQuestion = async (question) => {

    const creatorQuestion =
        /who (created|made|built|developed) you/i.test(question) ||
        /who is your creator/i.test(question) ||
        /who developed you/i.test(question);

    if (creatorQuestion) {
        return {
            answer: process.env.INFO,
            sources: ["direct"],
        };
    }
  // STEP 1
  // Ask the router what kind of information is needed.
  const route = await routeQuery(question);
  let ragContext = "";
  if (route.sources.includes("rag")) {
    const unitMatch = question.match(/\bunit\s*[-:]?\s*([1-6])\b/i);

    const unit = unitMatch ? `Unit ${unitMatch[1]}` : null;

    const chunks = await retrieveRelevantChunks(question, {
      subjectCodes: route.subjects,
      unit,
      limit: 6,
    });

    ragContext = buildRagContext(chunks);
  }
  console.log("\nROUTE:");
  console.log(route);

  // STEP 2
  // Direct/general question does not need RAG or JSON.
  if (route.sources.includes("direct")) {
    return generateAnswer(question, {});
  }

  // STEP 3
  // Retrieve structured sources such as faculty/timetable/books.
  const { context, unavailableSources } = await dispatchSources(
    route.sources,
    question,
    route.subjects,
  );

  // STEP 4
  // If router selected RAG, perform vector retrieval.
if (route.sources.includes("rag")) {
    context.rag = ragContext;
}

  // STEP 5
  // Generate final answer using retrieved context.
  const answer = await generateAnswer(question, {
    ...context,
    rag: ragContext,
  });

  return {
    answer,
    sources: route.sources,
    subjects: route.subjects,
    unavailableSources,
  };
};

module.exports = {
  answerQuestion,
};
