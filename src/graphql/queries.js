/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionnaireById = /* GraphQL */ `
  query GetQuestionnaireById($id: String) {
    getQuestionnaireById(id: $id) {
      id
      createdAt
      groupsCanAccess
      groupsCanAccessQuestions
      questions {
        items {
          id
          imageKey
          imageName
          answer
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      answer
      owner
      createdAt
      question {
        id
        imageKey
        imageName
        answer
        createdAt
        answers {
          nextToken
        }
        questionnaire {
          id
          createdAt
          groupsCanAccess
          groupsCanAccessQuestions
        }
      }
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
        answer
        owner
        createdAt
        question {
          id
          imageKey
          imageName
          answer
          createdAt
        }
      }
      nextToken
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
        groupsCanAccess
        groupsCanAccessQuestions
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      createdAt
      groupsCanAccess
      groupsCanAccessQuestions
      questions {
        items {
          id
          imageKey
          imageName
          answer
          createdAt
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
        imageKey
        imageName
        answer
        createdAt
        answers {
          nextToken
        }
        questionnaire {
          id
          createdAt
          groupsCanAccess
          groupsCanAccessQuestions
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
      answers {
        items {
          id
          answer
          owner
          createdAt
        }
        nextToken
      }
      questionnaire {
        id
        createdAt
        groupsCanAccess
        groupsCanAccessQuestions
        questions {
          nextToken
        }
      }
    }
  }
`;
