const {
  getQuestionnaire,
  listQuestions,
  listQuestionsWithCorrection,
} = require('../services/appSync.service');
const { questionnaireStatusFromNowMethod, mapQuestionsToTypename } = require('../utils');

module.exports = async (ctx) => {
  const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
  const { id } = ctx.arguments;
  const { username } = ctx.identity;
  const { startTime, duration } = await getQuestionnaire({ id });
  const { status, startsIn, remainingTime } = getQuestionnaireStatus(
    startTime,
    duration,
  );
  let questions = [];
  switch (status) {
    case 'NOT_PLAYED':
      break;
    case 'PLAYING': {
      questions = (await listQuestions(
        { id, owner: username },
      )).items;
      break;
    }
    case 'PLAYED': {
      questions = (await listQuestionsWithCorrection(
        { id, owner: username },
      )).items;
      break;
    }
    default:
      break;
  }
  return {
    startTime,
    duration,
    startsIn,
    remainingTime,
    status,
    questions: {
      items: mapQuestionsToTypename('CandidateQuestion')(questions),
    },
  };
};
