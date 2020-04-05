import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loader from '../Loader/Loader.component';
import QuestionnaireCardEdit from '../QuestionnaireCard/QuestionnaireCardEdit.component';
import QuestionnaireCard from '../QuestionnaireCard/QuestionnaireCard.component';
import AddIcon from '../AddIcon/AddIcon.component';
import {
  listSortedQuestionnaires, updateQuestionnaire, deleteQuestionnaire, createQuestionnaire,
} from './QuestionnairesPage.util';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  min-width: 750px;
  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
    min-width: auto;
  }
`;

const QuestionnairesPage = ({ isAdmin }) => {
  const [questionnaires, setQuestionnaires] = useState(null);
  const [addQuestionnaireOpened, setAddQuestionnaireOpened] = useState(false);

  useEffect(() => {
    listSortedQuestionnaires().then(setQuestionnaires);
  }, []);

  return (
    !questionnaires
      ? <Loader />
      : <Container>
      {questionnaires.map((q) => (
        <QuestionnaireCard
          key={q.id}
          questionnaire={q}
          onUpdate={(questionnaire) => updateQuestionnaire(questionnaire)}
          onDelete={(questionnaire) => deleteQuestionnaire(questionnaire)
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
              .then(listSortedQuestionnaires)
              .then(setQuestionnaires)
              .then(() => setAddQuestionnaireOpened(false))
            }
          />
        : <AddIcon
            onClick={() => setAddQuestionnaireOpened(true)}
          />
      )}
    </Container>
  );
};

export default QuestionnairesPage;
