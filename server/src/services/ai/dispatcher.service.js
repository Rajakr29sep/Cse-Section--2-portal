const timetable = require("../../../data/timetable.json");
const faculty = require("../../../data/faculty.json");
const sectionInformation = require("../../../data/section-info.json");

const { findBooksForSubject } = require("./books.service");
const { getResources } = require("./resources.service");

const { retrieveRelevantChunks } = require("../../../rag/retrieval/retriever");
const { buildRagContext } = require("../../../rag/retrieval/context-builder");

const dispatchSources = async (sources, question, routingSubjects = []) => {
  const context = {};
  const unavailableSources = [];

  for (const source of sources) {
    try {
      switch (source) {
        case "timetable":
          context.timetable = timetable;
          break;

        case "faculty":
          context.faculty = faculty;
          break;

        case "rag": {
          const chunks = await retrieveRelevantChunks(question, {
            subjectCodes: routingSubjects,
            limit: 6,
          });

          context.rag = buildRagContext(chunks);

          break;
        }

        case "section_information":
          context.sectionInformation = sectionInformation;
          break;

        case "books":
          if (routingSubjects && routingSubjects.length > 0) {
            context.books = routingSubjects.flatMap((subjectCode) =>
              findBooksForSubject(subjectCode),
            );
          } else {
            context.books = [];
          }
          break;

        case "notices":
          context.notices = {
            available: false,
            message: "Live USICT notices are currently not accessible.",
          };
          break;

        case "question_papers":
          context.questionPapers = getResources("question_papers");
          break;

        case "study_material":
          context.studyMaterial = getResources("study_material");
          break;

        case "syllabus":
          unavailableSources.push("syllabus");
          break;

        default:
          unavailableSources.push(source);
      }
    } catch (error) {
      console.error(`Source failed: ${source}`, error.message);

      unavailableSources.push(source);
    }
  }

  return {
    context,
    unavailableSources,
  };
};

module.exports = {
  dispatchSources,
};
