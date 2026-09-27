const { pipeline } = require('@huggingface/transformers');

let extractorPromise;

const getEmbedder = async () => {
    if (!extractorPromise) {
        extractorPromise = pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2'
        );
    }

    return extractorPromise;
};

const createEmbedding = async (text) => {
    const model = await getEmbedder();

    const output = await model(text, {
        pooling: 'mean',
        normalize: true,
    });

    return Array.from(output.data);
};

const createEmbeddings = async (texts) => {
    const results = [];

    for (let i = 0; i < texts.length; i++) {
        results.push(await createEmbedding(texts[i]));

        if ((i + 1) % 20 === 0) {
            console.log(`Embedded ${i + 1}/${texts.length}`);
        }
    }

    return results;
};

module.exports = {
    getEmbedder,
    createEmbedding,
    createEmbeddings,
};
