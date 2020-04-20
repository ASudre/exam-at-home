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

const getExtendedQuestionnaireQuery = gql`
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      questions {
        items {
          id
          createdAt
          answer
          answers {
            items {
              owner
              answer
            }
          }
        }
        nextToken
      }
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
          createdAt
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
          createdAt
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

const getQuestionnaireFromQuestionQuery = gql`
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      questionnaire {
        startTime
        name
        duration
        createdAt
      }
    }
  }
`;

const getExtendedAnswerQuery = gql`
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      owner
      question {
        id
        questionnaire {
          id
          startTime
          name
          duration
          createdAt
        }
      }
    }
  }
`;

const getAnswerQuery = gql`
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      answer
      owner
      createdAt
    }
  }
`;

module.exports = {
  getAnswerQuery,
  getQuestionnaireQuery,
  getExtendedQuestionnaireQuery,
  getCandidateQuestionnaireQuery,
  getCandidateQuestionnaireWithCorrectionQuery,
  getQuestionnaireFromQuestionQuery,
  getExtendedAnswerQuery,
};
