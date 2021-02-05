const { createCandidateAnswer, getQuestionnaireFromQuestion } = require('../services/appSync.service');
const { questionnaireStatusFromNowMethod } = require('../utils');

module.exports = async (ctx) => {
  const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
  const questionnaire = await getQuestionnaireFromQuestion({
    id: ctx.arguments.input.answerQuestionId,
  });
  const { status } = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
  const answer = status === 'PLAYING'
    ? await createCandidateAnswer({
      input: {
        owner: ctx.identity.username, ...ctx.arguments.input,
      },
    }) : {};
  return {
    ...answer,
    questionnaireStatus: status,
  };
};
