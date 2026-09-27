const buildRagContext = (chunks) => {
    if (!chunks || chunks.length === 0) {
        return 'No relevant syllabus context was retrieved.';
    }

    return chunks
        .map((chunk, index) => {
            const meta = chunk.metadata || {};
            const location = [
                meta.subjectCode,
                meta.subject,
                meta.unit,
                meta.page ? `page ${meta.page}` : null,
            ]
                .filter(Boolean)
                .join(' | ');

            return [
                `SOURCE ${index + 1}`,
                `Similarity: ${chunk.score}`,
                location ? `Location: ${location}` : null,
                `Text: ${chunk.text}`,
            ]
                .filter(Boolean)
                .join('\n');
        })
        .join('\n\n');
};

module.exports = { buildRagContext };
