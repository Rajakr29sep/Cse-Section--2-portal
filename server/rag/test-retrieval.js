require("dotenv").config();

const { retrieveRelevantChunks } = require("./retrieval/retriever");

const question = "What are the topics covered in Unit 2 of Compiler Design?";

const run = async () => {
    const results = await retrieveRelevantChunks(question, ["PC 303"], 5);

    console.log("\nQUESTION:");
    console.log(question);

    console.log("\nRETRIEVED CHUNKS:\n");

    results.forEach((result, index) => {
        console.log(`--- RESULT ${index + 1} ---`);
        console.log(`Score: ${result.score}`);
        console.log(`Page: ${result.metadata.page}`);
        console.log(`Subject: ${result.metadata.subject}`);
        console.log(`Unit: ${result.metadata.unit}`);
        console.log(`Text:\n${result.text}`);
        console.log();
    });
};

run().catch((error) => {
    console.error("Retrieval test failed:", error);
});