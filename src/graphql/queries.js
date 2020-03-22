/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      questions {
        items {
          id
          questionnaireId
          imageKey
        }
        nextToken
      }
    }
  }
`;
export const listQuestionnaires = /* GraphQL */ `
  query ListQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      questionnaireId
      imageKey
      answers {
        items {
          id
          questionId
          answer
          owner
        }
        nextToken
      }
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionnaireId
        imageKey
        answers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      questionId
      answer
      owner
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionId
        answer
        owner
      }
      nextToken
    }
  }
`;
