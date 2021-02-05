const moment = require('moment');

const questionnaireStatusFromNowMethod = (now = new Date()) => (time, duration) => {
  if (moment(now).isBefore(moment(time))) {
    return {
      startsIn: moment(time).diff(moment(now), 'seconds'),
      status: 'NOT_PLAYED',
    };
  }
  if (moment(now).isBefore(moment(time).add(duration, 'minutes'))) {
    return {
      remainingTime: moment(time).add(duration, 'minutes').diff(moment(now), 'seconds'),
      status: 'PLAYING',
    };
  }
  return {
    status: 'PLAYED',
  };
};

const mapQuestionsToTypename = (typename) => (list) => (
  list.map((e) => ({ ...e, __typename: typename })));

module.exports = {
  questionnaireStatusFromNowMethod,
  mapQuestionsToTypename,
};
