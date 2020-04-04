import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { get } from 'lodash';

import { getAdminQuestionnaire, getCandidateQuestionnaire } from '../../graphql/custom_queries';
import CandidateQuestionnaire from '../CandidateQuestionnaire/CandidateQuestionnaire.component';
import AdminQuestionnaire from '../AdminQuestionnaire/AdminQuestionnaire.component';
import Loader from '../Loader/Loader.component';

const refreshQuestionnaire = (id, isAdmin) => async (setQuestionnaire) => API
  .graphql(
    graphqlOperation(isAdmin
      ? getAdminQuestionnaire
      : getCandidateQuestionnaire,
    {
      id,
    }),
  )
  .then((res) => setQuestionnaire(
    get(res, 'data.getQuestionnaire', {}),
  ))
  .catch((e) => {
    console.error(e);
  });

const Questionnaire = ({ isAdmin }) => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    refreshQuestionnaire(id, isAdmin)(setQuestionnaire);
  },
  [id, isAdmin]);

  if (!questionnaire) {
    return <Loader />;
  }

  return (isAdmin
    ? <AdminQuestionnaire
        questionnaire={questionnaire}
        refreshQuestionnaire={() => refreshQuestionnaire(id, true)(setQuestionnaire)}
      />
    : <CandidateQuestionnaire
        questionnaire={questionnaire}
      />);
};

export default Questionnaire;
