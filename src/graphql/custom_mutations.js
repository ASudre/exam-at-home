/* eslint-disable import/prefer-default-export */
export const createCandidateAnswer = /* GraphQL */ `
  mutation CreateCandidateAnswer(
    $input: SaveAnswerInput!
  ) {
    createCandidateAnswer(input: $input) {
      id
      answer
    }
  }
`;
export const updateCandidateAnswer = /* GraphQL */ `
  mutation UpdateCandidateAnswer(
    $input: SaveAnswerInput!
  ) {
    updateCandidateAnswer(input: $input) {
      id
      answer
    }
  }
`;
export const deleteCandidateAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: SaveAnswerInput!
  ) {
    deleteCandidateAnswer(input: $input) {
      id
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
      imageKey
      imageName
      answer
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
      imageKey
      imageName
      answer
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
      imageKey
      imageName
      answer
    }
  }
`;
export const createQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
      id
      startTime
      name
      duration
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
      startTime
      name
      duration
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
      startTime
      name
      duration
      createdAt
    }
  }
`;
