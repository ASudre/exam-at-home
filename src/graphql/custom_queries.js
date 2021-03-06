/* eslint-disable import/prefer-default-export */
export const getCandidateQuestionnaire = /* GraphQL */ `
  query GetCandidateQuestionnaire($id: ID!) {
    getCandidateQuestionnaire(id: $id) {
      status
      startTime
      duration
      startsIn
      remainingTime
      questions {
        items {
          id
          answer
          imageKey
          imageName
          createdAt
          answers {
            items {
              id
              answer
            }
          }
        }
      }
    }
  }
`;

export const getAdminQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      createdAt
      questions {
        items {
          id
          answer
          imageKey
          imageName
          createdAt
        }
        nextToken
      }
    }
  }
`;

export const generateQuestionnaireReport = /* GraphQL */ `
  query GenerateQuestionnaireReport($id: ID!) {
    generateQuestionnaireReport(id: $id)
  }
`;
