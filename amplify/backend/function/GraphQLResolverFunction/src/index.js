/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiExamAtHomeGraphQLAPIIdOutput = process.env.API_EXAMATHOME_GRAPHQLAPIIDOUTPUT
var apiExamAtHomeGraphQLAPIEndpointOutput = process.env.API_EXAMATHOME_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
const appsync = require('aws-appsync');
const fetch = require('node-fetch');
const { get } = require('lodash');
const moment = require('moment');

global.fetch = fetch;

const {
  getAnswerQuery,
  getQuestionnaireQuery,
  getCandidateQuestionnaireQuery,
  getCandidateQuestionnaireWithCorrectionQuery,
  getQuestionnaireFromQuestionQuery,
} = require('./graphql/queries');

const {
  createCandidateAnswerMutation,
  updateCandidateAnswerMutation,
} = require('./graphql/mutations');

const getAppsyncClient = async () => new appsync.AWSAppSyncClient({
  url: process.env.API_EXAMATHOME_GRAPHQLAPIENDPOINTOUTPUT,
  region: process.env.AWS_REGION,
  auth: {
    type: 'AWS_IAM',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  },
  disableOffline: true,
});

const getQuestionnaire = (query, variables) => getAppsyncClient()
  .then(async (client) => client.query({ query, variables }))
  .then((res) => get(res, 'data.getQuestionnaire', {}));

const getAnswer = (query, variables) => getAppsyncClient()
  .then(async (client) => client.query({ query, variables }))
  .then((res) => get(res, 'data.getAnswer', {}));

const getQuestionnaireFromQuestion = (query, variables) => getAppsyncClient()
  .then(async (client) => client.query({ query, variables }))
  .then((res) => get(res, 'data.getQuestion.questionnaire', {}));

const listQuestions = (query, variables) => getAppsyncClient()
  .then(async (client) => client.query({ query, variables }))
  .then((res) => get(res, 'data.getQuestionnaire.questions', {}));

const createCandidateAnswer = (mutation, variables) => getAppsyncClient()
  .then(async (client) => client.mutate({ mutation, variables }))
  .then((res) => get(res, 'data.createAnswer', {}));

const updateCandidateAnswer = (mutation, variables) => getAppsyncClient()
  .then(async (client) => client.mutate({ mutation, variables }))
  .then((res) => get(res, 'data.updateAnswer', {}));

const questionnaireStatusFromNowMethod = (now = new Date()) => (time, duration) => {
  if (moment(now).isBefore(moment(time))) {
    return 'NOT_PLAYED';
  }
  if (moment(now).isBefore(moment(time).add(duration, 'minutes'))) {
    return 'PLAYING';
  }
  return 'PLAYED';
};

const mapQuestionsToTypename = (typename) => (list) => (
  list.map((e) => ({ ...e, __typename: typename })));

const resolvers = {
  Query: {
    getCandidateQuestionnaire: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const { id } = ctx.arguments;
      const { username } = ctx.identity;
      const questionnaire = await getQuestionnaire(getQuestionnaireQuery, { id });
      const status = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
      let questions = [];
      switch (status) {
        case 'NOT_PLAYED':
          break;
        case 'PLAYING': {
          questions = (await listQuestions(
            getCandidateQuestionnaireQuery,
            { id, owner: username },
          )).items;
          break;
        }
        case 'PLAYED': {
          questions = (await listQuestions(
            getCandidateQuestionnaireWithCorrectionQuery,
            { id, owner: username },
          )).items;
          break;
        }
        default:
          break;
      }
      return {
        status,
        questions: {
          items: mapQuestionsToTypename('CandidateQuestion')(questions),
        },
      };
    },
  },
  Mutation: {
    createCandidateAnswer: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const questionnaire = await getQuestionnaireFromQuestion(getQuestionnaireFromQuestionQuery, {
        id: ctx.arguments.input.answerQuestionId,
      });
      const status = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
      const answer = status === 'PLAYING'
        ? await createCandidateAnswer(
          createCandidateAnswerMutation,
          {
            input: {
              owner: ctx.identity.username, ...ctx.arguments.input,
            },
          },
        ) : {};
      return {
        ...answer,
        questionnaireStatus: status,
      };
    },
    updateCandidateAnswer: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const questionnaire = await getQuestionnaireFromQuestion(getQuestionnaireFromQuestionQuery, {
        id: ctx.arguments.input.answerQuestionId,
      });
      const status = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
      const answer = status === 'PLAYING'
        ? await updateCandidateAnswer(
          updateCandidateAnswerMutation,
          ctx.arguments,
        )
        : await getAnswer(getAnswerQuery, { id: ctx.arguments.input.id });
      return {
        ...answer,
        questionnaireStatus: status,
      };
    },
  },
};

exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return resolver(event);
    }
  }
  throw new Error('Resolver not found.');
};
