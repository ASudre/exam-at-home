/* eslint-disable import/prefer-default-export */
export const listQuestionsAnswers = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageKey
        imageName
        createdAt
        questionnaire {
          id
          createdAt
        }
        answers {
          nextToken
          items {
            id
            answer
          }
        }
      }
      nextToken
    }
  }
`;
