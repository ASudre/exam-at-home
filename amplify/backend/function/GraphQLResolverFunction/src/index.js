/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authExamathome46b3332aUserPoolId = process.env.AUTH_EXAMATHOME46B3332A_USERPOOLID
var apiExamAtHomeGraphQLAPIIdOutput = process.env.API_EXAMATHOME_GRAPHQLAPIIDOUTPUT
var apiExamAtHomeGraphQLAPIEndpointOutput = process.env.API_EXAMATHOME_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
const appsync = require('aws-appsync');
const fetch = require('node-fetch');
const { get } = require('lodash');
const moment = require('moment');
const CognitoISP = require('aws-sdk/clients/cognitoidentityserviceprovider');

global.fetch = fetch;

const cognitoISP = new CognitoISP(
  {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
    region: 'eu-west-1',
  },
);

const {
  getAnswerQuery,
  getQuestionnaireQuery,
  getExtendedQuestionnaireQuery,
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
    generateQuestionnaireReport: async (ctx) => {
      const { id } = ctx.arguments;
      const scale = {
        'N/A': 0,
        R: 2.5,
        W: -0.5,
      };

      const users = await cognitoISP
        .listUsers({ UserPoolId: process.env.AUTH_EXAMATHOME46B3332A_USERPOOLID }).promise()
        .then(({ Users }) => Users.map((u) => u.Username));

      const { questions } = await getQuestionnaire(getExtendedQuestionnaireQuery, { id });
      if (!questions) {
        return '';
      }
      const sortedQuestions = questions
        .items
        .sort((q1, q2) => (q1.createdAt > q2.createdAt ? 1 : -1));

      const header = ['Username', ...sortedQuestions.map((_, i) => `Q${i + 1}`), 'Mark'];

      const rows = users.map((u) => {
        const answers = sortedQuestions.map((q) => {
          const answerObj = q.answers.items.find((a) => a.owner === u);
          if (!answerObj) {
            return 'N/A';
          }
          return answerObj.answer === q.answer ? 'R' : 'W';
        });
        const mark = answers.reduce((acc, a) => acc + scale[a], 0);
        return [u, ...answers, mark];
      });

      return [header, ...rows].map((r) => r.join(',')).join('\n');
    },
    getCandidateQuestionnaire: async (ctx) => {
      const getQuestionnaireStatus = questionnaireStatusFromNowMethod();
      const { id } = ctx.arguments;
      const { username } = ctx.identity;
      const { startTime, duration } = await getQuestionnaire(getQuestionnaireQuery, { id });
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
        startTime,
        duration,
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
      const { owner, question: { id: questionId, questionnaire } } = await getAnswer(
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
      const { owner, question: { questionnaire } } = await getAnswer(
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
