const SUBJECTS = [
    ['PC 301', 'Technical and Scientific Writing'],
    ['PC 303', 'Compiler Design'],
    ['PC 305', 'Programming in C++'],
    ['PE 333T', 'Natural Language Processing'],
    ['EAE 355T', 'Statistics and Statistical Modelling'],
    ['PCE 349T', 'Advanced Software Architecture and System Design'],
];

const normalize = (text) => text.replace(/\s+/g, ' ').trim();

const detectSubject = (text) => {
    const normalized = normalize(text);

    for (const [code, name] of SUBJECTS) {
        if (normalized.includes(`Paper Code: ${code}`) || normalized.includes(`Paper Code:${code}`)) {
            return { subjectCode: code, subject: name };
        }
    }

    // Also support the common case where the heading is simply present.
    for (const [code, name] of SUBJECTS) {
        if (normalized.includes(code) && normalized.includes(name)) {
            return { subjectCode: code, subject: name };
        }
    }

    return {};
};

const detectUnit = (text) => {
    const match = text.match(/\bUnit\s*[-:]?\s*([1-6])\b/i);
    return match ? `Unit ${match[1]}` : null;
};

const detectPaperCode = (text) => {
    const match = text.match(/Paper Code:\s*([A-Z]{2,4}\s*[-]?\s*\d{3}[A-Z]?)/i);
    return match ? match[1].replace(/\s+/g, ' ').trim() : null;
};

const makeMetadata = ({ document, page, text, chunkIndex }) => {
    const subject = detectSubject(text);
    const unit = detectUnit(text);
    const paperCode = detectPaperCode(text);

    return {
        source: 'USICT Syllabus PDF',
        document,
        page,
        semester: 5,
        chunkIndex,
        ...(paperCode ? { paperCode } : {}),
        ...(subject.subjectCode ? { subjectCode: subject.subjectCode } : {}),
        ...(subject.subject ? { subject: subject.subject } : {}),
        ...(unit ? { unit } : {}),
    };
};

module.exports = {
    SUBJECTS,
    detectSubject,
    detectUnit,
    makeMetadata,
};
