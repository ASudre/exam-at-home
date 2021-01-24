import React, { useState } from 'react';
import { S3Image } from 'aws-amplify-react';
import { I18n } from 'aws-amplify';

import Button from '../Button/Button.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import Card from '../Card/Card.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import RadioButtons from '../RadioButtons/RadioButtons.component.jsx';

const answerValues = ['A', 'B', 'C', 'D'];

const QuestionCardUpdate = ({
  question, onSave, onDelete,
}) => {
  const [answer, setAnswer] = useState(question.answer);
  const [savedAnswer, setSavedAnswer] = useState(question.answer);

  const buildInput = () => ({
    id: question.id,
    questionnaireId: question.questionnaireId,
    answer,
  });

  return (
    <Card>
      <CardContent>
        <S3Image theme={{ photoImg: { width: '100%' } }} imgKey={question.imageKey} alt="question" />
        <RadioButtons
          values={answerValues}
          setValue={setAnswer}
          checkedValue={answer}
        />
      </CardContent>
      <CardActions>
        <Button
          disabled={answer === savedAnswer}
          onClick={() => onSave(buildInput()).then(() => {
            // why data.updateQuestion.answer is null?
            setSavedAnswer(answer);
          })}
        >
          {I18n.get('Update')}
        </Button>
        <Button
          onClick={() => onDelete(question)}
        >
          {I18n.get('Delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestionCardUpdate;
