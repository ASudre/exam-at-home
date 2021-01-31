import React from 'react';
import {
  API, Storage, graphqlOperation, I18n,
} from 'aws-amplify';

import {
  createQuestion as createMutation,
  deleteQuestion as deleteMutation,
  updateQuestion as updateMutation,
} from '../../graphql/custom_mutations';
import QuestionCardCreate from './AdminQuestionCardCreate.component.jsx';
import QuestionCardUpdate from './AdminQuestionCardUpdate.component.jsx';
import { showSnackbar } from '../Snackbar/Snackbar.component.jsx';

const save = (mutation) => (questionToSave, fileToStore = {}) => (
  fileToStore.name
    ? Storage.put(questionToSave.imageKey, fileToStore, { contentType: 'image/png' })
    : Promise.resolve())
  .then(async () => API.graphql(graphqlOperation(mutation, { input: questionToSave })))
  .catch(console.error);

const deleteQuestion = (question) => (
  Storage.remove(question.imageKey)
    .then(async () => API.graphql(graphqlOperation(deleteMutation, { input: { id: question.id } })))
    .catch(console.error));

const createQuestion = save(createMutation);
const updateQuestion = save(updateMutation);

const QuestionCard = ({
  question, refreshQuestionnaire, questionnaireId, update,
}) => (update
  ? (<QuestionCardUpdate
    question={question}
    onSave={(q) => updateQuestion(q).then(() => showSnackbar(I18n.get('Updated')))}
    onDelete={(q) => deleteQuestion(q).then(() => showSnackbar(I18n.get('Deleted'))).then(refreshQuestionnaire)}
  />)
  : (<QuestionCardCreate
    questionnaireId={questionnaireId}
    onSave={(q, f) => createQuestion(q, f).then(() => showSnackbar(I18n.get('Created'))).then(refreshQuestionnaire)}
  />));

export default QuestionCard;
