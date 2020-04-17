import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { get } from 'lodash';

import { getAdminQuestionnaire, getCandidateQuestionnaire } from '../../graphql/custom_queries';
import CandidateQuestionnaire from '../CandidateQuestionnaire/CandidateQuestionnaire.component';
import AdminQuestionnaire from '../AdminQuestionnaire/AdminQuestionnaire.component';
import Loader from '../Loader/Loader.component';
import WaitingForStart from '../WaitingForStart/WaitingForStart.component';

const getQuestionnaire = async (id, isAdmin) => API
  .graphql(
    graphqlOperation(isAdmin
      ? getAdminQuestionnaire
      : getCandidateQuestionnaire,
    {
      id,
    }),
  )
  .then((res) => get(res, isAdmin ? 'data.getQuestionnaire' : 'data.getCandidateQuestionnaire', {}))
  .then((q) => ({
    ...q,
    questions: {
      ...q.questions,
      items: q.questions.items.sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))),
    },
  }))
  .catch((e) => {
    console.error(e);
  });

const QuestionnairePage = ({ isAdmin }) => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    getQuestionnaire(id, isAdmin).then(setQuestionnaire);
  },
  [id, isAdmin]);

  if (isAdmin === null || !questionnaire) {
    return <Loader />;
  }

  if(questionnaire.status === 'NOT_PLAYED') {
    return <WaitingForStart
      startsIn={questionnaire.startsIn}
      onStart={() => getQuestionnaire(id, isAdmin).then(setQuestionnaire)}
    />
  }

  return (isAdmin
    ? <AdminQuestionnaire
          questionnaire={questionnaire}
          refreshQuestionnaire={() => getQuestionnaire(id, true).then(setQuestionnaire)}
        />
    : <CandidateQuestionnaire
          questionnaire={questionnaire}
        />);
};

export default QuestionnairePage;
