/* eslint-disable import/prefer-default-export */
export const getCandidateQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      createdAt
      questions {
        items {
          id
          imageKey
          imageName
          answers {
            items {
              id
              answer
            }
          }
          createdAt
        }
        nextToken
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
