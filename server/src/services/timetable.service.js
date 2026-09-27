const timetable = require("../../data/timetable.json");

const normalize = (value = "") => {
  return value
    .toLowerCase()
    .replace(/[^\w\s+#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const subjectMatches = (item, search) => {
  const query = normalize(search);

  const subjectName = normalize(item.subjectName);
  const subjectCode = normalize(item.subjectCode);

  if (!query) {
    return true;
  }

  // C++ / cpp / programming in c++
  if (
    query === "c++" ||
    query === "cpp" ||
    query.includes("programming in c++")
  ) {
    return (
      subjectCode === "pc 305" ||
      subjectCode === "pc 323" ||
      subjectName.includes("programming in c++")
    );
  }

  // Compiler Design
  if (query.includes("compiler") || query === "compiler design") {
    return (
      subjectCode === "pc 303" ||
      subjectCode === "pc 321" ||
      subjectName.includes("compiler")
    );
  }

  return subjectName.includes(query) || subjectCode.includes(query);
};

const getTimetable = ({ day, subject, subjectCode, faculty, type }) => {
  let result = [...timetable];

  if (day) {
    result = result.filter(
      (item) => item.day.toLowerCase() === day.toLowerCase(),
    );
  }

  if (subject) {
    result = result.filter((item) => subjectMatches(item, subject));
  }

  if (subjectCode) {
    const search = normalize(subjectCode);

    result = result.filter((item) =>
      normalize(item.subjectCode).includes(search),
    );
  }

  if (faculty) {
    const search = normalize(faculty);

    result = result.filter((item) => normalize(item.faculty).includes(search));
  }

  if (type) {
    if (type === "PracticalOrLab") {
      result = result.filter(
        (item) => item.type === "Practical" || item.type === "Lab",
      );
    } else {
      result = result.filter((item) => item.type === type);
    }
  }

  return result;
};

module.exports = {
  getTimetable,
};
