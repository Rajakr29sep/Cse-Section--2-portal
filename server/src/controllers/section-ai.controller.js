const sectionAIService = require("../services/section-ai.service");

const askSectionAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,

        message: "Question is required",
      });
    }

    const result = await sectionAIService.answerQuestion(message.trim());

    return res.status(200).json({
      success: true,

      answer: result.answer,

      sources: result.sources || [],
    });
  } catch (error) {
    console.error("Section AI error:", error);

    return res.status(500).json({
      success: false,

      message: "Unable to process your question right now.",
    });
  }
};

module.exports = {
  askSectionAI,
};
