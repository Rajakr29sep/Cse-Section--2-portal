const { QdrantClient } = require("@qdrant/js-client-rest");

const COLLECTION_NAME = process.env.QDRANT_COLLECTION || "cse2_syllabus";

const VECTOR_SIZE = 384;

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  checkCompatibility: false,
});
const ensurePayloadIndex = async (fieldName) => {
  try {
    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: fieldName,
      field_schema: "keyword",
    });

    console.log(`Payload index ready: ${fieldName}`);
  } catch (error) {
    const message = error?.data?.status?.error || error?.message || "";

    if (
      message.toLowerCase().includes("already exists") ||
      message.toLowerCase().includes("already exist")
    ) {
      console.log(`Payload index already exists: ${fieldName}`);
      return;
    }

    throw error;
  }
};

const ensureCollection = async () => {
  const collections = await qdrant.getCollections();

  const exists = collections.collections.some(
    (collection) => collection.name === COLLECTION_NAME,
  );

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine",
      },
    });

    console.log(`Created Qdrant collection: ${COLLECTION_NAME}`);
  }

  await qdrant.createPayloadIndex(COLLECTION_NAME, {
    field_name: "subjectCode",
    field_schema: "keyword",
  });

  await qdrant.createPayloadIndex(COLLECTION_NAME, {
    field_name: "unit",
    field_schema: "keyword",
  });

  console.log("Qdrant payload indexes ready.");
};
const upsertChunks = async (chunks, embeddings) => {
  if (chunks.length !== embeddings.length) {
    throw new Error("Chunks and embeddings length mismatch");
  }

  const points = chunks.map((chunk, index) => ({
    id: index + 1,
    vector: embeddings[index],
    payload: {
      text: chunk.text,
      chunkId: chunk.id,
      ...chunk.metadata,
    },
  }));

  const BATCH_SIZE = 64;

  for (let i = 0; i < points.length; i += BATCH_SIZE) {
    const batch = points.slice(i, i + BATCH_SIZE);

    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points: batch,
    });

    console.log(
      `Upserted ${Math.min(i + BATCH_SIZE, points.length)}/${points.length}`,
    );
  }
};

const searchChunks = async ({ vector, limit = 5, subjectCode, unit }) => {
  const must = [];

  if (subjectCode) {
    must.push({
      key: "subjectCode",
      match: {
        value: subjectCode,
      },
    });
  }

  if (unit) {
    must.push({
      key: "unit",
      match: {
        value: unit,
      },
    });
  }

  const filter = must.length > 0 ? { must } : undefined;

  const result = await qdrant.query(COLLECTION_NAME, {
    query: vector,
    limit,
    with_payload: true,
    ...(filter ? { filter } : {}),
  });

  return result.points || [];
};

module.exports = {
  qdrant,
  COLLECTION_NAME,
  VECTOR_SIZE,
  ensureCollection,
  upsertChunks,
  searchChunks,
  ensurePayloadIndex
};
