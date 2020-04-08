import React from 'react';
import { get } from 'lodash';

import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component';

const Questionnaire = ({ questionnaire }) => (
  <>
    {get(questionnaire, 'questions.items', []).map((q) => (
      <CandidateQuestionCard
        key={q.id}
        question={q}
      />
    ))}
  </>
);


export default Questionnaire;
