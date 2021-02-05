const CognitoISP = require('aws-sdk/clients/cognitoidentityserviceprovider');
const { credentials, cognitoISP: { userPoolId } } = require('../config');

const cognitoISP = new CognitoISP(
  {
    credentials,
    region: 'eu-west-1',
  },
);

const listUsers = (paginationToken = null) => cognitoISP
  .listUsers({ UserPoolId: userPoolId, PaginationToken: paginationToken }).promise()
  .then(async ({ Users, PaginationToken }) => (PaginationToken
    ? [...(await listUsers(paginationToken)), ...Users.map((u) => u.Username)]
    : Users.map((u) => u.Username)));

const listGroupUsers = (groupName, paginationToken = null) => cognitoISP
  .listUsersInGroup({
    UserPoolId: userPoolId,
    GroupName: groupName,
    PaginationToken: paginationToken,
  }).promise()
  .then(async ({ Users, PaginationToken }) => (PaginationToken
    ? [...(await listGroupUsers(groupName, paginationToken)), ...Users.map((u) => u.Username)]
    : Users.map((u) => u.Username)));

module.exports = {
  listUsers,
  listGroupUsers,
};
