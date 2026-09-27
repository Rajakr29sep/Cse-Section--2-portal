require("dotenv").config();
const path = require('path');
const fs = require('fs');

const { loadPdfPages } = require('./pdf-loader');
const { chunkPages } = require('./chunker');
const { createEmbeddings } = require('./embedder');
const { ensureCollection, upsertChunks, COLLECTION_NAME } = require('../retrieval/qdrant');

const PDF_PATH = process.argv[2] || path.join(__dirname, '..', 'documents', 'btechaxIII030926.pdf');
const OUTPUT_PATH = path.join(__dirname, '..', 'documents', 'chunks.preview.json');

const main = async () => {
    if (!fs.existsSync(PDF_PATH)) {
        throw new Error(`PDF not found: ${PDF_PATH}`);
    }

    console.log(`Loading PDF: ${PDF_PATH}`);
    const { totalPages, pages } = await loadPdfPages(PDF_PATH);
    console.log(`Extracted ${pages.length} non-empty pages out of ${totalPages}`);

    const document = path.basename(PDF_PATH);
    const chunks = chunkPages(pages, document);
    console.log(`Created ${chunks.length} chunks`);

    // Save a human-readable preview before embedding.
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(chunks, null, 2));
    console.log(`Chunk preview written to ${OUTPUT_PATH}`);

    await ensureCollection();

    console.log('Creating local embeddings. First run downloads the model.');
    const embeddings = await createEmbeddings(chunks.map((chunk) => chunk.text));

    console.log(`Embedding dimension: ${embeddings[0]?.length || 0}`);
    await upsertChunks(chunks, embeddings);

    console.log(`RAG ingestion complete. Collection: ${COLLECTION_NAME}`);
};

main().catch((error) => {
    console.error('RAG ingestion failed:', error);
    process.exit(1);
});
