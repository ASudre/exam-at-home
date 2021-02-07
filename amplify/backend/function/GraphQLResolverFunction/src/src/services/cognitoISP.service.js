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
  .then(async ({ Users, PaginationToken }) => [
    ...Users.map((u) => u.Username),
    ...(PaginationToken
      ? await listUsers(PaginationToken)
      : []
    ),
  ]);

const listGroupUsers = (groupName, nextToken = null) => cognitoISP
  .listUsersInGroup({
    UserPoolId: userPoolId,
    GroupName: groupName,
    NextToken: nextToken,
  }).promise()
  .then(async ({ Users, NextToken }) => [
    ...Users.map((u) => u.Username),
    ...(NextToken
      ? await listGroupUsers(groupName, NextToken)
      : []
    ),
  ]);

module.exports = {
  listUsers,
  listGroupUsers,
};
