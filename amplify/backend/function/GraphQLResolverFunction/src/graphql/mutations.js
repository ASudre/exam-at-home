const gql = require('graphql-tag');

const createCandidateAnswerMutation = gql`
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      answer
    }
  }
`;

const updateCandidateAnswerMutation = gql`
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      answer
    }
  }
`;

const deleteCandidateAnswerMutation = gql`
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      answer
    }
  }
`;

module.exports = {
  createCandidateAnswerMutation,
  updateCandidateAnswerMutation,
  deleteCandidateAnswerMutation,
};
