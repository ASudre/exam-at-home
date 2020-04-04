import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import QuestionCard from '../AdminQuestionCard/AdminQuestionCard.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const AdminQuestionnaire = ({ questionnaire, refreshQuestionnaire }) => (
  <Container>
    {get(questionnaire, 'questions.items', []).map((q) => (
      <QuestionCard
        key={q.id}
        question={q}
        refreshQuestionnaire={refreshQuestionnaire}
        update
      />
    ))}
    <QuestionCard
      questionnaireId={questionnaire.id}
      refreshQuestionnaire={refreshQuestionnaire}
    />
  </Container>
);

export default AdminQuestionnaire;
