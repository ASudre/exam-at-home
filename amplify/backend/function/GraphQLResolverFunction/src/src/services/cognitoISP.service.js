const CognitoISP = require('aws-sdk/clients/cognitoidentityserviceprovider');
const { credentials, cognitoISP: { userPoolId } } = require('../config');

const cognitoISP = new CognitoISP(
  {
    credentials,
    region: 'eu-west-1',
  },
);

const listUsers = () => cognitoISP
  .listUsers({ UserPoolId: userPoolId }).promise()
  .then(({ Users }) => Users.map((u) => u.Username));

const listGroupUsers = (groupName) => cognitoISP
  .listUsersInGroup({
    UserPoolId: userPoolId,
    GroupName: groupName,
  }).promise()
  .then(({ Users }) => Users.map((u) => u.Username));

module.exports = {
  listUsers,
  listGroupUsers,
};
