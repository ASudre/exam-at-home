const appsync = require('aws-appsync');
const { get } = require('lodash');
const {
  getQuestionnaireQuery,
  getAnswerQuery,
  getQuestionnaireFromQuestionQuery,
  getCandidateQuestionnaireQuery,
  getCandidateQuestionnaireWithCorrectionQuery,
  getExtendedAnswerQuery,
  getExtendedQuestionnaireQuery,
} = require('../../graphql/queries');
const {
  createCandidateAnswerMutation,
  updateCandidateAnswerMutation,
  deleteCandidateAnswerMutation,
} = require('../../graphql/mutations');

const { credentials, appSync: appSyncConfig } = require('../config');

const appSyncClient = new appsync.AWSAppSyncClient({
  ...appSyncConfig,
  auth: {
    type: 'AWS_IAM',
    credentials,
  },
});

const queryAppSync = (query, variables) => appSyncClient.hydrated()
  .then(async (client) => client.query({ query, variables }));
const mutateAppSync = (query, variables) => appSyncClient.hydrated()
  .then(async (client) => client.mutate({ query, variables }));

const getQuestionnaire = (variables) => queryAppSync(
  getQuestionnaireQuery, variables,
).then((res) => get(res, 'data.getQuestionnaire', {}));

const getQuestionnaireWithQuestions = (variables) => queryAppSync(
  getExtendedQuestionnaireQuery, variables,
).then((res) => get(res, 'data.getQuestionnaire', {}));

const getAnswer = (variables) => queryAppSync(
  getAnswerQuery, variables,
).then((res) => get(res, 'data.getAnswer', {}));

const getAnswerWithQuestionnaire = (variables) => queryAppSync(
  getExtendedAnswerQuery, variables,
).then((res) => get(res, 'data.getAnswer', {}));

const getQuestionnaireFromQuestion = (variables) => queryAppSync(
  getQuestionnaireFromQuestionQuery, variables,
).then((res) => get(res, 'data.getQuestion.questionnaire', {}));

const listQuestions = (variables) => queryAppSync(
  getCandidateQuestionnaireQuery, variables,
).then((res) => get(res, 'data.getQuestionnaire.questions', {}));

const listQuestionsWithCorrection = (variables) => queryAppSync(
  getCandidateQuestionnaireWithCorrectionQuery, variables,
).then((res) => get(res, 'data.getQuestionnaire.questions', {}));

const createCandidateAnswer = (variables) => mutateAppSync(
  createCandidateAnswerMutation, variables,
).then((res) => get(res, 'data.createAnswer', {}));

const updateCandidateAnswer = (variables) => mutateAppSync(
  updateCandidateAnswerMutation, variables,
).then((res) => get(res, 'data.updateAnswer', {}));

const deleteCandidateAnswer = (variables) => mutateAppSync(
  deleteCandidateAnswerMutation, variables,
).then((res) => get(res, 'data.deleteAnswer', {}));

module.exports = {
  getQuestionnaire,
  getQuestionnaireWithQuestions,
  getAnswer,
  getAnswerWithQuestionnaire,
  getQuestionnaireFromQuestion,
  listQuestions,
  listQuestionsWithCorrection,
  createCandidateAnswer,
  updateCandidateAnswer,
  deleteCandidateAnswer,
};
