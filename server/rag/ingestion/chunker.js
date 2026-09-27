const { detectSubject, detectUnit } = require('./metadata');

const MIN_CHUNK_CHARS = 500;
const MAX_CHUNK_CHARS = 1800;
const OVERLAP_CHARS = 250;

const splitLongBlock = (block) => {
    const pieces = [];
    let start = 0;

    while (start < block.length) {
        const end = Math.min(start + MAX_CHUNK_CHARS, block.length);
        let cut = end;

        // Prefer cutting at sentence/line boundaries rather than mid-word.
        const local = block.slice(start, end);
        const candidates = [
            local.lastIndexOf('\n'),
            local.lastIndexOf('. '),
            local.lastIndexOf('; '),
            local.lastIndexOf(', '),
            local.lastIndexOf(' '),
        ];
        const best = Math.max(...candidates);
        if (best > MIN_CHUNK_CHARS / 2) {
            cut = start + best + (local[best] === '\n' ? 1 : 1);
        }

        const piece = block.slice(start, cut).trim();
        if (piece) pieces.push(piece);

        if (cut >= block.length) break;
        start = Math.max(cut - OVERLAP_CHARS, start + 1);
    }

    return pieces;
};

/**
 * Structure-aware chunking:
 * 1. Keep PDF pages as the first boundary.
 * 2. Split paragraphs/blocks.
 * 3. Attach nearby subject/unit headings to following content.
 * 4. Only use character windows when a block is too large.
 */
const chunkPages = (pages, document) => {
    const chunks = [];
    let activeSubject = {};
    let activeUnit = null;

    for (const page of pages) {
        const cleaned = page.text.trim();
        if (!cleaned) continue;

        const pageSubject = detectSubject(cleaned);
        if (pageSubject.subjectCode) activeSubject = pageSubject;

        const pageUnit = detectUnit(cleaned);
        if (pageUnit) activeUnit = pageUnit;

        const blocks = cleaned
            .split(/\n\s*\n+/)
            .map((x) => x.trim())
            .filter(Boolean);

        let buffer = '';
        const flush = () => {
            if (!buffer.trim()) return;

            const pieces = splitLongBlock(buffer.trim());
            for (const text of pieces) {
                chunks.push({
                    text,
                    metadata: {
                        source: 'USICT Syllabus PDF',
                        document,
                        page: page.page,
                        semester: 5,
                        ...(activeSubject.subjectCode ? { subjectCode: activeSubject.subjectCode } : {}),
                        ...(activeSubject.subject ? { subject: activeSubject.subject } : {}),
                        ...(activeUnit ? { unit: activeUnit } : {}),
                    },
                });
            }
            buffer = '';
        };

        for (const block of blocks) {
            const blockSubject = detectSubject(block);
            const blockUnit = detectUnit(block);

            if (blockSubject.subjectCode) activeSubject = blockSubject;
            if (blockUnit) activeUnit = blockUnit;

            const candidate = buffer ? `${buffer}\n${block}` : block;

            if (candidate.length <= MAX_CHUNK_CHARS) {
                buffer = candidate;
            } else {
                flush();
                buffer = block;
            }
        }

        flush();
    }

    return chunks.map((chunk, index) => ({
        id: `syllabus-${String(index + 1).padStart(5, '0')}`,
        ...chunk,
        metadata: {
            ...chunk.metadata,
            chunkIndex: index,
        },
    }));
};

module.exports = {
    chunkPages,
    MAX_CHUNK_CHARS,
    OVERLAP_CHARS,
};
