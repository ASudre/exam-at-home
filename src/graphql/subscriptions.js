/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionnaire {
    onCreateQuestionnaire {
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
export const onUpdateQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionnaire {
    onUpdateQuestionnaire {
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
export const onDeleteQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionnaire {
    onDeleteQuestionnaire {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
