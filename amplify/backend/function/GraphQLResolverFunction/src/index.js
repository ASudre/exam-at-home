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
  getExtendedAnswerQuery,
} = require('./graphql/queries');

const {
  createCandidateAnswerMutation,
  updateCandidateAnswerMutation,
  deleteCandidateAnswerMutation,
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

const getExtendedAnswer = (query, variables) => getAppsyncClient()
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

const deleteCandidateAnswer = (mutation, variables) => getAppsyncClient()
  .then(async (client) => client.mutate({ mutation, variables }))
  .then((res) => get(res, 'data.deleteAnswer', {}));

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

const resolvers = {
  Query: {
    getCandidateQuestionnaire: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const { id } = ctx.arguments;
      const { username } = ctx.identity;
      const questionnaire = await getQuestionnaire(getQuestionnaireQuery, { id });
      const { status, startsIn, remainingTime } = getQuestionnaireStatus(
        questionnaire.startTime,
        questionnaire.duration,
      );
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
        startsIn,
        remainingTime,
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
      const { status } = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
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
      const { owner, question: { id: questionId, questionnaire } } = await getExtendedAnswer(
        getExtendedAnswerQuery, {
          id: ctx.arguments.input.id,
        },
      );
      if (owner !== ctx.identity.username) {
        throw new Error('The answer is not owner by logged user');
      }
      const { status } = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
      const answer = status === 'PLAYING'
        ? await updateCandidateAnswer(
          updateCandidateAnswerMutation,
          {
            input: {
              ...ctx.arguments.input,
              answerQuestionId: questionId,
            },
          },
        )
        : await getAnswer(getAnswerQuery, { id: ctx.arguments.input.id });
      return {
        ...answer,
        questionnaireStatus: status,
      };
    },
    deleteCandidateAnswer: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const { owner, question: { questionnaire } } = await getExtendedAnswer(
        getExtendedAnswerQuery, {
          id: ctx.arguments.input.id,
        },
      );
      if (owner !== ctx.identity.username) {
        throw new Error('The answer is not owner by logged user');
      }
      const { status } = getQuestionnaireStatus(questionnaire.startTime, questionnaire.duration);
      const answer = status === 'PLAYING'
        ? await deleteCandidateAnswer(
          deleteCandidateAnswerMutation,
          {
            input: {
              id: ctx.arguments.input.id,
            },
          },
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
