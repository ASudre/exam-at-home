/* eslint-disable max-classes-per-file */

const formatQuestionnaire = (questions) => ({
  data: {
    getQuestionnaire: {
      questions: {
        items: questions.map((q) => (
          {
            id: '1',
            createdAt: '2020-04-20T09:06:54.421Z',
            answer: q[0],
            answers: {
              items: q[1].map((a) => ({
                owner: a[0],
                answer: a[1],
                __typename: 'Answer',
              })),
              __typename: 'ModelAnswerConnection',
            },
            __typename: 'Question',
          })),
      },
    },
  },
});
const mockQuery = jest.fn();
jest.mock('aws-appsync', () => ({
  AWSAppSyncClient: class {
    hydrated = () => Promise.resolve({
      query: mockQuery,
    });
  },
}));

const formatUsers = (users) => ({
  Users: users.map((u) => ({
    Username: u,
  })),
});
const mockListUsers = jest.fn();
const mockListUsersInGroup = jest.fn();
jest.mock('aws-sdk/clients/cognitoidentityserviceprovider', () => class {
  listUsers = () => ({ promise: mockListUsers });

  listUsersInGroup = () => ({ promise: mockListUsersInGroup });
});
const formatReport = (answers) => (`Username,Q1,Q2,Mark
${answers.map((a) => a.join(',')).join(`
`)}`);

module.exports = {
  utils: {
    formatUsers,
    formatQuestionnaire,
    formatReport,
    restore: () => {
      mockQuery.mockResolvedValue(formatQuestionnaire([]));
      mockListUsers.mockResolvedValue(formatUsers([]));
      mockListUsersInGroup.mockResolvedValue(formatUsers([]));
    },
  },
  appsync: {
    mockQuery,
  },
  cognitoISP: {
    mockListUsers,
    mockListUsersInGroup,
  },
};
