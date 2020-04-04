/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const appsync = require('aws-appsync');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
global.fetch = fetch;

const getAppsyncClient = async () => new appsync.AWSAppSyncClient({
  url: process.env.API_URL,
  region: process.env.REGION,
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

const getQuestionnaireById = async (questionnaireId) => {
    const getQuestionnaireByIdQuery = gql`query getQuestionnaire(
      $id: ID!
    ) {
        getQuestionnaire(id: $id) {
            id
            createdAt
      }
    }`;
    return getAppsyncClient()
      .then(async (client) => {
        return client.query({
          query: getQuestionnaireByIdQuery,
          variables: {
            id: questionnaireId,
          },
        });
      });
  };

exports.handler = async (event) => {
    console.log(event);
    return (await getQuestionnaireById('b3b1eec8-27ef-4317-9ad1-b0609d8e3107')).data.getQuestionnaire;
}
