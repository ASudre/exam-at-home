import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { get } from 'lodash';
import awsconfig from '../../aws-exports';

import { listQuestionnaires } from '../../graphql/queries';

import {
  deleteQuestionnaire as deleteMutation,
  createQuestionnaire as createMutation,
  updateQuestionnaire as updateMutation,
} from '../../graphql/custom_mutations';

Amplify.configure(awsconfig);

export const save = (mutation) => (questionnaire) => API
  .graphql(graphqlOperation(mutation, { input: questionnaire }))
  .catch(console.error);

export const createQuestionnaire = save(createMutation);
export const deleteQuestionnaire = save(deleteMutation);
export const updateQuestionnaire = save(updateMutation);

export const listSortedQuestionnaires = () => API
  .graphql(graphqlOperation(listQuestionnaires))
  .then((res) => get(res, 'data.listQuestionnaires.items', [])
    .sort((a, b) => (new Date(a.startTime) - new Date(b.startTime))))
  .catch((e) => {
    console.error(e);
  });
