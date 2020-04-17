const gql = require('graphql-tag');

const getQuestionnaireQuery = gql`
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      startTime
      name
      duration
      createdAt
    }
  }
`;

const getCandidateQuestionnaireQuery = gql`
  query GetQuestionnaire(
    $id: ID!
    $owner: String
  ) {
    getQuestionnaire(id: $id) {
      questions {
        items {
          id
          imageKey
          imageName
          answers(filter: {owner: {
            eq: $owner
          }}) {
            items {
              id
              owner
              answer
              createdAt
            }
          }
        }
        nextToken
      }
    }
  }
`;

const getCandidateQuestionnaireWithCorrectionQuery = gql`
  query GetQuestionnaire(
    $id: ID!
    $owner: String
  ) {
    getQuestionnaire(id: $id) {
      questions {
        items {
          id
          imageKey
          imageName
          answer
          answers(filter: {owner: {
            eq: $owner
          }}) {
            items {
              id
              owner
              answer
              createdAt
            }
          }
        }
        nextToken
      }
    }
  }
`;

module.exports = {
  getQuestionnaireQuery,
  getCandidateQuestionnaireQuery,
  getCandidateQuestionnaireWithCorrectionQuery,
};
