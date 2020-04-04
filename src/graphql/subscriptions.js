/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionnaire {
    onCreateQuestionnaire {
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
export const onUpdateQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionnaire {
    onUpdateQuestionnaire {
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
export const onDeleteQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionnaire {
    onDeleteQuestionnaire {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($owner: String!) {
    onCreateAnswer(owner: $owner) {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($owner: String!) {
    onUpdateAnswer(owner: $owner) {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($owner: String!) {
    onDeleteAnswer(owner: $owner) {
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
