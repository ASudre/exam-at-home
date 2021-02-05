module.exports = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  appSync: {
    url: process.env.API_EXAMATHOME_GRAPHQLAPIENDPOINTOUTPUT,
    region: process.env.REGION,
    disableOffline: true,
  },
  cognitoISP: {
    userPoolId: process.env.AUTH_EXAMATHOME46B3332A_USERPOOLID,
  },
};
