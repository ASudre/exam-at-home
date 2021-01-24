import React, { useEffect, useState } from 'react';

import Loader from '../Loader/Loader.component.jsx';
import QuestionnaireCardEdit from '../QuestionnaireCard/QuestionnaireCardEdit.component.jsx';
import QuestionnaireCard from '../QuestionnaireCard/QuestionnaireCard.component.jsx';
import AddIcon from '../AddIcon/AddIcon.component.jsx';
import {
  listSortedQuestionnaires, updateQuestionnaire, deleteQuestionnaire, createQuestionnaire,
} from './QuestionnairesPage.util';
import { showSnackbar } from '../Snackbar/Snackbar.component.jsx';

const QuestionnairesPage = ({ isAdmin }) => {
  const [questionnaires, setQuestionnaires] = useState(null);
  const [addQuestionnaireOpened, setAddQuestionnaireOpened] = useState(false);

  useEffect(() => {
    listSortedQuestionnaires().then(setQuestionnaires);
  }, []);

  return (
    !questionnaires
      ? <Loader />
      : <>
        {questionnaires.map((q) => (
          <QuestionnaireCard
            key={q.id}
            questionnaire={q}
            onUpdate={(questionnaire) => updateQuestionnaire(questionnaire).then((uq) => { showSnackbar('updated'); return uq; })}
            onDelete={(questionnaire) => deleteQuestionnaire(questionnaire).then(() => showSnackbar('deleted'))
              .then(listSortedQuestionnaires)
              .then(setQuestionnaires)
            }
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && (addQuestionnaireOpened
          ? <QuestionnaireCardEdit
            onClose={() => setAddQuestionnaireOpened(false)}
            onCreate={(questionnaire) => createQuestionnaire(questionnaire)
              .then(() => showSnackbar('created'))
              .then(listSortedQuestionnaires)
              .then(setQuestionnaires)
              .then(() => setAddQuestionnaireOpened(false))
            }
          />
          : <AddIcon
            onClick={() => setAddQuestionnaireOpened(true)}
          />
        )}
      </>
  );
};

export default QuestionnairesPage;
