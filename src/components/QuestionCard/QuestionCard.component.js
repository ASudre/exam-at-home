import React from 'react';
import { API, Storage, graphqlOperation } from 'aws-amplify';

import {
  createQuestion as createMutation,
  deleteQuestion as deleteMutation,
  updateQuestion as updateMutation,
} from '../../graphql/mutations';
import QuestionCardCreate from './QuestionCardCreate.component';
import QuestionCardUpdate from './QuestionCardUpdate.component';

const save = (mutation) => (fileToStore, questionToSave) => (
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
  question, onSave, questionnaireId, update,
}) => (update
  ? (<QuestionCardUpdate
        question={question}
        onSave={(f, q) => updateQuestion(f, q).then(onSave)}
        onDelete={(q) => deleteQuestion(q).then(onSave)}
        update
      />)
  : (<QuestionCardCreate
        questionnaireId={questionnaireId}
        onSave={(f, q) => createQuestion(f, q).then(onSave)}
      />));

export default QuestionCard;
