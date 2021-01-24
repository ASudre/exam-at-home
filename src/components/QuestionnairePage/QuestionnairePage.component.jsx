import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { get } from 'lodash';
import awsconfig from '../../aws-exports';

import { getAdminQuestionnaire, getCandidateQuestionnaire } from '../../graphql/custom_queries';
import CandidateQuestionnaire from '../CandidateQuestionnaire/CandidateQuestionnaire.component';
import AdminQuestionnaire from '../AdminQuestionnaire/AdminQuestionnaire.component';
import Loader from '../Loader/Loader.component';
import WaitingForStart from '../WaitingForStart/WaitingForStart.component';

Amplify.configure(awsconfig);

const getQuestionnaire = async (id, isAdmin) => API
  .graphql(
    graphqlOperation(
      isAdmin
        ? getAdminQuestionnaire
        : getCandidateQuestionnaire,
      {
        id,
      },
    ),
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
    if (isAdmin !== null) {
      getQuestionnaire(id, isAdmin).then(setQuestionnaire);
    }
  }, [id, isAdmin]);

  if (isAdmin === null || !questionnaire) {
    return <Loader />;
  }

  if (isAdmin) {
    return <AdminQuestionnaire
      questionnaire={questionnaire}
      refreshQuestionnaire={() => getQuestionnaire(id, true).then(setQuestionnaire)}
    />;
  }

  return (questionnaire.status === 'NOT_PLAYED'
    ? <WaitingForStart
      startsIn={questionnaire.startsIn}
      startTime={questionnaire.startTime}
      onStart={() => getQuestionnaire(id, false).then(setQuestionnaire)}
    />
    : <CandidateQuestionnaire
      questionnaire={questionnaire}
      onTimeIsUp={() => getQuestionnaire(id, false).then(setQuestionnaire)}
    />
  );
};

export default QuestionnairePage;
