/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
      id
      questions {
        items {
          id
        }
        nextToken
      }
    }
  }
`;
export const updateQuestionnaire = /* GraphQL */ `
  mutation UpdateQuestionnaire(
    $input: UpdateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    updateQuestionnaire(input: $input, condition: $condition) {
      id
      questions {
        items {
          id
        }
        nextToken
      }
    }
  }
`;
export const deleteQuestionnaire = /* GraphQL */ `
  mutation DeleteQuestionnaire(
    $input: DeleteQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    deleteQuestionnaire(input: $input, condition: $condition) {
      id
      questions {
        items {
          id
        }
        nextToken
      }
    }
  }
`;
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      answer
      question {
        id
        image {
          bucket
          region
          key
        }
        questionnaire {
          id
        }
        answers {
          nextToken
        }
      }
      owner
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      answer
      question {
        id
        image {
          bucket
          region
          key
        }
        questionnaire {
          id
        }
        answers {
          nextToken
        }
      }
      owner
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      answer
      question {
        id
        image {
          bucket
          region
          key
        }
        questionnaire {
          id
        }
        answers {
          nextToken
        }
      }
      owner
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      image {
        bucket
        region
        key
      }
      questionnaire {
        id
        questions {
          nextToken
        }
      }
      answers {
        items {
          id
          answer
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      image {
        bucket
        region
        key
      }
      questionnaire {
        id
        questions {
          nextToken
        }
      }
      answers {
        items {
          id
          answer
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      image {
        bucket
        region
        key
      }
      questionnaire {
        id
        questions {
          nextToken
        }
      }
      answers {
        items {
          id
          answer
          owner
        }
        nextToken
      }
    }
  }
`;
