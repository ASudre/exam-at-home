import React from 'react';

import styled from 'styled-components';
import { get } from 'lodash';

import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Questionnaire = ({ questionnaire }) => (
  <Container>
    {get(questionnaire, 'questions.items', []).map((q) => (
      <CandidateQuestionCard
        key={q.id}
        question={q}
      />
    ))}
  </Container>
);


export default Questionnaire;
