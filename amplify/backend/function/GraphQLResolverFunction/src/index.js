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
  getQuestionnaireQuery,
  getCandidateQuestionnaireQuery,
  getCandidateQuestionnaireWithCorrectionQuery,
} = require('./graphql/queries');

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

const listQuestions = (query, variables) => getAppsyncClient()
  .then(async (client) => client.query({ query, variables }))
  .then((res) => get(res, 'data.getQuestionnaire.questions', {}));

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
      const questionnaire = {
        ...await getQuestionnaire(getQuestionnaireQuery, { id }),
        questions: [],
      };
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
