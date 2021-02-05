/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authExamathome46b3332aUserPoolId = process.env.AUTH_EXAMATHOME46B3332A_USERPOOLID
var apiExamAtHomeGraphQLAPIIdOutput = process.env.API_EXAMATHOME_GRAPHQLAPIIDOUTPUT
var apiExamAtHomeGraphQLAPIEndpointOutput = process.env.API_EXAMATHOME_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
const fetch = require('node-fetch');

global.fetch = fetch;

const generateQuestionnaireReport = require('./src/queries/generateQuestionnaireReport');
const getCandidateQuestionnaire = require('./src/queries/getCandidateQuestionnaire');
const createCandidateAnswer = require('./src/mutations/createCandidateAnswer');
const updateCandidateAnswer = require('./src/mutations/updateCandidateAnswer');
const deleteCandidateAnswer = require('./src/mutations/deleteCandidateAnswer');

const resolvers = {
  Query: {
    generateQuestionnaireReport,
    getCandidateQuestionnaire,
  },
  Mutation: {
    createCandidateAnswer,
    updateCandidateAnswer,
    deleteCandidateAnswer,
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
