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
export const onUpdateQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionnaire {
    onUpdateQuestionnaire {
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
export const onDeleteQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionnaire {
    onDeleteQuestionnaire {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($owner: String!) {
    onCreateAnswer(owner: $owner) {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($owner: String!) {
    onUpdateAnswer(owner: $owner) {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($owner: String!) {
    onDeleteAnswer(owner: $owner) {
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
