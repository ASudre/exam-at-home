/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionnaire {
    onCreateQuestionnaire {
      id
      questions {
        items {
          id
          questionnaireId
          imageKey
          answer
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
      questions {
        items {
          id
          questionnaireId
          imageKey
          answer
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
      questions {
        items {
          id
          questionnaireId
          imageKey
          answer
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
      owner
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      questionnaireId
      imageKey
      answer
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      questionnaireId
      imageKey
      answer
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      questionnaireId
      imageKey
      answer
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
