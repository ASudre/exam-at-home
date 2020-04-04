/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionnaireById = /* GraphQL */ `
  query GetQuestionnaireById($id: String) {
    getQuestionnaireById(id: $id) {
      id
      createdAt
      questions {
        items {
          id
          imageKey
          imageName
          answer
          createdAt
          groupsCanAccess
        }
        nextToken
      }
    }
  }
`;
export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      createdAt
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
        createdAt
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
      imageKey
      imageName
      answer
      createdAt
      questionnaire {
        id
        createdAt
        questions {
          nextToken
        }
      }
      answers {
        items {
          id
          answer
          owner
          createdAt
        }
        nextToken
      }
      groupsCanAccess
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
        imageKey
        imageName
        answer
        createdAt
        questionnaire {
          id
          createdAt
        }
        answers {
          nextToken
        }
        groupsCanAccess
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      question {
        id
        imageKey
        imageName
        answer
        createdAt
        questionnaire {
          id
          createdAt
        }
        answers {
          nextToken
        }
        groupsCanAccess
      }
      answer
      owner
      createdAt
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
        question {
          id
          imageKey
          imageName
          answer
          createdAt
          groupsCanAccess
        }
        answer
        owner
        createdAt
      }
      nextToken
    }
  }
`;
