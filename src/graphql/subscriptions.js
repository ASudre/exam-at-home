/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionnaire {
    onCreateQuestionnaire {
      id
      createdAt
      questions {
        items {
          id
          questionnaireId
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
export const onUpdateQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionnaire {
    onUpdateQuestionnaire {
      id
      createdAt
      questions {
        items {
          id
          questionnaireId
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
export const onDeleteQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionnaire {
    onDeleteQuestionnaire {
      id
      createdAt
      questions {
        items {
          id
          questionnaireId
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      questionnaireId
      imageKey
      imageName
      answer
      createdAt
      answers {
        items {
          id
          questionId
          answer
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      questionnaireId
      imageKey
      imageName
      answer
      createdAt
      answers {
        items {
          id
          questionId
          answer
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      questionnaireId
      imageKey
      imageName
      answer
      createdAt
      answers {
        items {
          id
          questionId
          answer
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($owner: String!) {
    onCreateAnswer(owner: $owner) {
      id
      questionId
      answer
      createdAt
      owner
    }
  }
`;
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($owner: String!) {
    onUpdateAnswer(owner: $owner) {
      id
      questionId
      answer
      createdAt
      owner
    }
  }
`;
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($owner: String!) {
    onDeleteAnswer(owner: $owner) {
      id
      questionId
      answer
      createdAt
      owner
    }
  }
`;
