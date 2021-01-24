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
import {
  createCandidateAnswer as createMutation,
  updateCandidateAnswer as updateMutation,
  deleteCandidateAnswer as deleteMutation,
} from '../../graphql/custom_mutations';

const answerValues = ['A', 'B', 'C', 'D'];

const save = (mutation) => (answer) => (
  API.graphql(graphqlOperation(mutation, { input: answer })))
  .catch(console.error);

const updateAnswer = save(updateMutation);
const createAnswer = save(createMutation);
const deleteAnswer = save(deleteMutation);

const CandidateQuestionCard = ({
  question,
  onUpdateAnswer,
  onCreateAnswer,
  onDeleteAnswer,
  disabled,
}) => {
  const initAnswer = get(question, 'answers.items[0]', {});
  const correctAnswer = question.answer;
  const [answerValue, setAnswerValue] = useState(initAnswer.answer);
  const [savedAnswer, setSavedAnswer] = useState(initAnswer);

  useEffect(() => {
    setSavedAnswer(get(question, 'answers.items[0]', {}));
    if (disabled) {
      setAnswerValue(get(question, 'answers.items[0].answer', null));
    }
  }, [question, disabled]);

  const buildInput = () => ({
    id: savedAnswer.id || uuidV4(),
    answerQuestionId: question.id,
    answer: answerValue,
  });

  const onSave = (isUpdate) => ({ data }) => {
    const saved = isUpdate ? data.updateCandidateAnswer : data.createCandidateAnswer;
    setSavedAnswer(saved);
    setAnswerValue(saved.answer);
  };

  return (
    <Card>
      <CardContent>
        <S3Image theme={{ photoImg: { width: '100%' } }} imgKey={question.imageKey} alt="question" />
        <RadioButtons
          values={answerValues}
          setValue={setAnswerValue}
          checkedValue={answerValue}
          correctAnswer={correctAnswer}
          disabled={disabled}
        />
      </CardContent>
      {!disabled
        && <CardActions>
          <Button
            disabled={!answerValue || answerValue === savedAnswer.answer}
            onClick={
              () => (savedAnswer.id
                ? updateAnswer(buildInput()).then(onSave(true)).then(onUpdateAnswer)
                : createAnswer(buildInput()).then(onSave(false)).then(onCreateAnswer)
              )}
          >
            Answer
          </Button>
          <Button
            disabled={!savedAnswer.id}
            onClick={
              () => deleteAnswer(buildInput())
                .then(() => {
                  setSavedAnswer({});
                  setAnswerValue(null);
                })
                .then(onDeleteAnswer)
            }
          >
            Cancel
          </Button>
        </CardActions>
      }
    </Card>
  );
};

export default CandidateQuestionCard;
