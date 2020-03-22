const uuid = require('uuid');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
global.fetch = fetch;

const getAppsyncClient = async () => new appsync.AWSAppSyncClient({
  url: process.env.API_URL,
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

const importQuestions = async (question) => {
    const createQuestionMutation = gql`mutation CreateQuestion(
      $input: CreateQuestionInput!
      $condition: ModelQuestionConditionInput
    ) {
      createQuestion(input: $input, condition: $condition) {
        id
        imageUrl
      }
    }`;
    return getAppsyncClient()
      .then(async (client) => {
        return client.mutate({
          mutation: createQuestionMutation,
          variables: {
            input: question,
          },
        });
      });
  };

const handler = async (event) => {
  console.log('event :', event);
  const question = {
    id: uuid.v4(),
    imageUrl: 'test.png',
  };
  await importQuestions(question);
};

module.exports = {handler}
