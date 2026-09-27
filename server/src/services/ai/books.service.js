const subjectBooks = require("../../../data/subject-books.json");

const findBooksByCode = (subjectCode) => {
  const subject = subjectBooks.find((item) => item.subjectCode === subjectCode);

  if (!subject) {
    return [];
  }

  return [
    {
      subjectCode: subject.subjectCode,

      subjectName: subject.subjectName,

      books: subject.books,
    },
  ];
};

module.exports = {
  findBooksByCode,
};
