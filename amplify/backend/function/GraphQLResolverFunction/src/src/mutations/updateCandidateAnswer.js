const {
  getAnswer,
  getAnswerWithQuestionnaire,
  updateCandidateAnswer,
} = require('../services/appSync.service');
const { questionnaireStatusFromNowMethod } = require('../utils');

module.exports = async (ctx) => {
  const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
  const { owner, question: { id: questionId, questionnaire } } = await getAnswerWithQuestionnaire({
    id: ctx.arguments.input.id,
  });
  if (owner !== ctx.identity.username) {
    throw new Error('The answer is not owner by logged user');
  }
  const { status } = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
  const answer = status === 'PLAYING'
    ? await updateCandidateAnswer({
      input: {
        ...ctx.arguments.input,
        answerQuestionId: questionId,
      },
    })
    : await getAnswer({ id: ctx.arguments.input.id });
  return {
    ...answer,
    questionnaireStatus: status,
  };
};
