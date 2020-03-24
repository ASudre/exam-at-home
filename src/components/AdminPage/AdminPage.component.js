import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import styled from 'styled-components';
import { get } from 'lodash';
import QuestionCard from '../QuestionCard/QuestionCard.component';

import { listQuestions } from '../../graphql/queries';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const AdminPage = () => {
  const questionnaireId = '01b9162e-820e-42ce-a4f7-59ccf99a2642';
  const [questions, setQuestions] = useState([]);

  const refreshQuestionsList = () => API.graphql(graphqlOperation(listQuestions))
    .then((res) => setQuestions(
      get(res, 'data.listQuestions.items', [])
        .sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))),
    ))
    .catch((e) => {
      console.error(e);
    });

  useEffect(() => {
    refreshQuestionsList();
  }, []);

  return (
    <Container>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          onSave={refreshQuestionsList}
          update
        />
      ))}
      <QuestionCard
        questionnaireId={questionnaireId}
        onSave={refreshQuestionsList}
      />
    </Container>
  );
};

export default AdminPage;
