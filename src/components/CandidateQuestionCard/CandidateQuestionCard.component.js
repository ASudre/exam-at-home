import React, { useState } from 'react';
import { S3Image } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidV4 } from 'uuid';
import { get } from 'lodash';

import Button from '../Button/Button.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import RadioButtons from '../RadioButtons/RadioButtons.component';
import { createAnswer as createMutation, updateAnswer as updateMutation } from '../../graphql/mutations';

const answerValues = ['A', 'B', 'C', 'D'];

const save = (mutation) => (answerToSave) => (
  API.graphql(graphqlOperation(mutation, { input: answerToSave })))
  .catch(console.error);

const updateAnswer = save(updateMutation);
const saveAnswer = save(createMutation);

const CandidateQuestionCard = ({
  question,
  onSave,
}) => {
  const initAnswer = get(question, 'answers.items[0]', {});
  const [answer, setAnswer] = useState(initAnswer.answer);

  const buildInput = () => ({
    id: initAnswer.id || uuidV4(),
    answerQuestionId: question.id,
    answer,
  });

  return (
    <Card>
      <CardContent>
        <S3Image theme={{ photoImg: { width: '100%' } }} imgKey={question.imageKey} alt="question"/>
        <RadioButtons
          values={answerValues}
          setValue={setAnswer}
          checkedValue={answer}
        />
      </CardContent>
      <CardActions>
        <Button
          primary
          disabled={answer === initAnswer.answer}
          onClick={
            () => (initAnswer.id
              ? updateAnswer(buildInput())
              : saveAnswer(buildInput()))
              .then(onSave)}
        >
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default CandidateQuestionCard;
