/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCandidateQuestionnaire = /* GraphQL */ `
  query GetCandidateQuestionnaire($id: ID) {
    getCandidateQuestionnaire(id: $id) {
      startsIn
      status
      questions {
        items {
          id
          imageKey
          imageName
          createdAt
          answer
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
        startTime
        name
        duration
        createdAt
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
      startTime
      name
      duration
      createdAt
      questions {
        items {
          id
          imageKey
          imageName
          createdAt
          answer
        }
        nextToken
      }
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      imageKey
      imageName
      createdAt
      questionnaire {
        id
        startTime
        name
        duration
        createdAt
        questions {
          nextToken
        }
      }
      answer
      answers {
        items {
          id
          answer
          owner
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
        createdAt
        questionnaire {
          id
          startTime
          name
          duration
          createdAt
        }
        answer
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
      answer
      owner
      createdAt
      question {
        id
        imageKey
        imageName
        createdAt
        questionnaire {
          id
          startTime
          name
          duration
          createdAt
        }
        answer
        answers {
          nextToken
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
          createdAt
          answer
        }
      }
      nextToken
    }
  }
`;
