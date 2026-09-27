const fs = require('fs');
const { PDFParse } = require('pdf-parse');

/**
 * Extract text page-by-page.
 * We deliberately keep page boundaries because page number is useful
 * evidence/metadata during retrieval.
 */
const loadPdfPages = async (filePath) => {
    const data = fs.readFileSync(filePath);
    const parser = new PDFParse({ data });

    try {
        const info = await parser.getInfo({ parsePageInfo: true });
        const totalPages = info.total;
        const pages = [];

        // pdf-parse v2 supports partial page extraction.
        // This is slower than one giant extraction, but gives reliable page metadata.
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const result = await parser.getText({ partial: [pageNumber] });
            const text = (result.text || '').trim();

            if (text) {
                pages.push({
                    page: pageNumber,
                    text,
                });
            }
        }

        return {
            totalPages,
            pages,
        };
    } finally {
        await parser.destroy();
    }
};

module.exports = { loadPdfPages };
