import React, { useState, useEffect } from 'react';
import { S3Image } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidV4 } from 'uuid';
import { get } from 'lodash';

import Button from '../Button/Button.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import RadioButtons from '../RadioButtons/RadioButtons.component';
import { createCandidateAnswer as createMutation, updateCandidateAnswer as updateMutation } from '../../graphql/custom_mutations';

const answerValues = ['A', 'B', 'C', 'D'];

const save = (mutation) => (answerToSave) => (
  API.graphql(graphqlOperation(mutation, { input: answerToSave })))
  .catch(console.error);

const updateAnswer = save(updateMutation);
const createAnswer = save(createMutation);

const CandidateQuestionCard = ({
  question,
  onCreateAnswer,
  disabled,
}) => {
  const initAnswer = get(question, 'answers.items[0]', {});
  const correctAnswer = question.answer;
  const [answer, setAnswer] = useState(initAnswer.answer);
  const [savedAnswer, setSavedAnswer] = useState();

  useEffect(() => {
    setSavedAnswer(get(question, 'answers.items[0].answer', null));
    if (disabled) {
      setAnswer(get(question, 'answers.items[0].answer', null));
    }
  }, [question, disabled])

  const buildInput = () => ({
    id: initAnswer.id || uuidV4(),
    answerQuestionId: question.id,
    answer,
  });

  const onSave = (isUpdate) => ({ data }) => {
    const saved = isUpdate ? data.updateCandidateAnswer.answer : data.createCandidateAnswer.answer;
    setSavedAnswer(saved);
    setAnswer(saved);
  };

  return (
    <Card>
      <CardContent>
        <S3Image theme={{ photoImg: { width: '100%' } }} imgKey={question.imageKey} alt="question"/>
        <RadioButtons
          values={answerValues}
          setValue={setAnswer}
          checkedValue={answer}
          correctAnswer={correctAnswer}
          disabled={disabled}
        />
      </CardContent>
      {!disabled &&
        <CardActions>
          <Button
            disabled={answer === savedAnswer}
            onClick={
              () => (initAnswer.id
                ? updateAnswer(buildInput()).then(onSave(true))
                : createAnswer(buildInput()).then(onSave(false)).then(onCreateAnswer)
              )}
          >
            Answer
          </Button>
        </CardActions>
      }
    </Card>
  );
};

export default CandidateQuestionCard;
