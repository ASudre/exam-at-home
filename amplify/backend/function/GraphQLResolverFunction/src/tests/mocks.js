/* eslint-disable max-classes-per-file */

const formatQuestionnaire = (questions) => ({
  data: {
    getQuestionnaire: {
      questions: {
        items: questions.map((q, index) => (
          {
            id: index,
            createdAt: index,
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
const formatReport = (questions, result) => (`Username,${questions.map((_, i) => `Q${i + 1}`)},Mark
${result.map((a) => a.join(',')).join(`
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
