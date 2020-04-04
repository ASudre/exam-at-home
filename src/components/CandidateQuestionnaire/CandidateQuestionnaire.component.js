import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import styled from 'styled-components';
import { get } from 'lodash';

import { useParams } from 'react-router-dom';
import { getCandidateQuestionnaire } from '../../graphql/custom_queries';
import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Questionnaire = () => {
  const { id: questionnaireId } = useParams();
  const [questions, setQuestions] = useState([]);

  const refreshQuestionnaire = () => API.graphql(graphqlOperation(getCandidateQuestionnaire, {
    id: questionnaireId,
  }))
    .then((res) => setQuestions(
      get(res, 'data.getQuestionnaire.questions.items', [])
        .sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))),
    ))
    .catch((e) => {
      console.error(e);
    });

  useEffect(() => {
    refreshQuestionnaire();
  }, []);

  return (
      <Container>
        {questions.map((q) => (
          <CandidateQuestionCard
            key={q.id}
            question={q}
          />
        ))}
      </Container>
  );
};

export default Questionnaire;
