import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import styled from 'styled-components';
import { get } from 'lodash';

import { listQuestionsAnswers } from '../../graphql/custom_queries';
import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const refreshQuestionsList = () => API.graphql(graphqlOperation(listQuestionsAnswers))
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
        <CandidateQuestionCard
          key={q.id}
          question={q}
          onSave={refreshQuestionsList}
        />
      ))}
    </Container>
  );
};

export default HomePage;
