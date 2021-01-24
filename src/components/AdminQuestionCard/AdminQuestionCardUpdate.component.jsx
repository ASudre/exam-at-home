import React, { useState } from 'react';
import { S3Image } from 'aws-amplify-react';

import Button from '../Button/Button.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import RadioButtons from '../RadioButtons/RadioButtons.component';

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
          Update
        </Button>
        <Button
          onClick={() => onDelete(question)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestionCardUpdate;
