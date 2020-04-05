import React from 'react';

import Questionnaire from '../Questionnaire/Questionnaire.component';
import Loader from '../Loader/Loader.component';

const QuestionnairePage = ({ isAdmin }) => (isAdmin === null
  ? <Loader />
  : <Questionnaire
      isAdmin={isAdmin}
    />);

export default QuestionnairePage;
