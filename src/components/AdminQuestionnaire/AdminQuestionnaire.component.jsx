import React from 'react';
import { get } from 'lodash';

import QuestionCard from '../AdminQuestionCard/AdminQuestionCard.component';

const AdminQuestionnaire = ({ questionnaire, refreshQuestionnaire }) => (
  <>
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
  </>
);

export default AdminQuestionnaire;
