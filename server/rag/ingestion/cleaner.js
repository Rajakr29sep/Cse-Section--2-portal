/**
 * Clean PDF extraction noise without destroying academic structure.
 * We intentionally preserve headings such as Unit, Course Outcome,
 * Text Books, Paper Code, etc.
 */
const cleanText = (text) => {
    return text
        .replace(/\r/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/[ \t]*\n[ \t]*/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

module.exports = { cleanText };
