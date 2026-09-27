const answerGeneralQuestion = async (question) => {

    return {
        type: "general",
        question,
    };

};


module.exports = {
    answerGeneralQuestion,
};