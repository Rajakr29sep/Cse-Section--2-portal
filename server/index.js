require("dotenv").config();

const app = require("./src/app");
const { ensureCollection } = require("./rag/retrieval/qdrant");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await ensureCollection();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to initialize Qdrant:", error);
        process.exit(1);
    }
};

startServer();