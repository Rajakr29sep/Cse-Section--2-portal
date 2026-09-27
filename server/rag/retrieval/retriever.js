const { createEmbedding } = require("../ingestion/embedder");
const { searchChunks } = require("./qdrant");

const retrieveRelevantChunks = async (
  question,
  { subjectCodes = [], unit = null, limit = 6 } = {},
) => {
  const queryVector = await createEmbedding(question);

  const normalizedSubjects = Array.isArray(subjectCodes)
    ? subjectCodes.filter(Boolean)
    : [];

  let results = [];

  if (normalizedSubjects.length > 0) {
    // Search each identified subject independently so one subject cannot
    // crowd another out of the top-K results.
    const perSubject = Math.max(
      2,
      Math.ceil(limit / normalizedSubjects.length),
    );

    for (const subjectCode of normalizedSubjects) {
      const subjectResults = await searchChunks({
        vector: queryVector,
        limit: perSubject,
        subjectCode,
        unit,
      });
      results.push(...subjectResults);
    }

    results.sort((a, b) => (b.score || 0) - (a.score || 0));
    results = results.slice(0, limit);
  } else {
    results = await searchChunks({
      vector: queryVector,
      limit,
      unit,
    });
  }

  return results.map((item) => ({
    score: Number((item.score || 0).toFixed(4)),
    text: item.payload?.text || "",
    metadata: {
      source: item.payload?.source,
      document: item.payload?.document,
      page: item.payload?.page,
      semester: item.payload?.semester,
      subjectCode: item.payload?.subjectCode,
      subject: item.payload?.subject,
      unit: item.payload?.unit,
    },
  }));
};

module.exports = { retrieveRelevantChunks };
