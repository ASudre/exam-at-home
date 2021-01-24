import React, { useState } from 'react';

import QuestionnaireCardEdit from './QuestionnaireCardEdit.component';
import QuestionnaireCardCandidate from './QuestionnaireCardCandidate.component';

const QuestionnaireCard = ({
  questionnaire, onUpdate, onDelete, isAdmin,
}) => {
  const [edit, setEdit] = useState(false);
  const [savedQuestionnaire, setSavedQuestionnaire] = useState(questionnaire);
  return (!edit
    ? <QuestionnaireCardCandidate
        questionnaire={savedQuestionnaire}
        onEdit={() => setEdit(true)}
        isAdmin={isAdmin}
      />
    : <QuestionnaireCardEdit
        questionnaire={savedQuestionnaire}
        onClose={() => setEdit(false)}
        onUpdate={(q) => onUpdate(q)
          .then(({ data }) => {
            setSavedQuestionnaire(data.updateQuestionnaire);
          })
          .then(() => setEdit(false))
        }
        onDelete={onDelete}
      />);
};

export default QuestionnaireCard;
