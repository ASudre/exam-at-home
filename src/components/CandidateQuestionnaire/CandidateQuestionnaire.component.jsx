import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import moment from 'moment';
import {
  I18n,
} from 'aws-amplify';

import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component.jsx';
import Card from '../Card/Card.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import CardInfo from '../Card/CardInfo/CardInfo.component.jsx';
import InfoIcon from '../InfoIcon/InfoIcon.component.jsx';
import { showSnackbar } from '../Snackbar/Snackbar.component.jsx';

const InfoCard = styled(Card)`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const InfoCardContent = styled(CardContent)`
  background-color: ${(props) => props.theme.backgroundColor.primary};
`;

const Container = styled.div`
  background-color: white;
  padding: 10px 0;
`;

const toDisplay = (seconds) => (seconds > 0
  ? `${Math.floor(seconds / 60)} min
  ${seconds % 60} sec`
  : '0 sec');

const getAnswered = (questions) => questions
  .reduce((acc, q) => (q.answers.items.length > 0 ? acc + 1 : acc), 0);

const getMark = (questions, scale) => questions && questions.reduce((acc, q) => {
  const answer = get(q, 'answers.items[0].answer', null);
  if (!answer) {
    return acc + scale[2];
  }
  return answer === q.answer
    ? acc + scale[0]
    : acc + scale[1];
}, 0);

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Scale = ({ scale }) => {
  const format = ((nbPts) => `${nbPts}pt${Math.abs(nbPts) > 1 ? 's' : ''}`);
  return <FlexContainer>
    <div>{I18n.get('Correct answer:')} {format(scale[0])}</div>
    <div>{I18n.get('Wrong answer:')} {format(scale[1])}</div>
    <div>{I18n.get('No answer:')} {format(scale[2])}</div>
  </FlexContainer>;
};

const getEndTime = (startTime, duration) => moment(startTime).add(duration, 'minutes').toISOString();

const getRemainingTime = (endTime) => Math.floor((new Date(endTime) - new Date()) / 1000);

const scale = [2.5, -0.5, 0];

const Questionnaire = ({
  questionnaire: {
    questions: defaultQuestions, startTime, duration, status,
  }, onTimeIsUp,
}) => {
  const [endTime, setEndTime] = useState(getEndTime(startTime, duration));
  const [remainingTime, setRemainingTime] = useState(getRemainingTime(endTime));
  const [questions, setQuestions] = useState(get(defaultQuestions, 'items', []));
  const [answered, setAnswered] = useState(0);
  const [mark, setMark] = useState(0);
  const [maxMark, setMaxMark] = useState(0);

  useEffect(() => {
    setQuestions(get(defaultQuestions, 'items', []));
    setEndTime(getEndTime(startTime, duration));
  }, [defaultQuestions, startTime, duration]);

  useEffect(() => {
    let timeout = null;
    if (status === 'PLAYING') {
      if (remainingTime <= 0) {
        onTimeIsUp();
      } else {
        timeout = setTimeout(() => setRemainingTime(getRemainingTime(endTime)), 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [remainingTime, onTimeIsUp, status, endTime]);

  useEffect(() => {
    if (status === 'PLAYING') {
      setAnswered(getAnswered(questions));
      return;
    }
    if (status === 'PLAYED') {
      setMark(getMark(questions, scale));
      setMaxMark(questions.length * scale[0]);
    }
  }, [status, questions]);

  return (
    <>
      <Card>
        <CardContent>
          <CardInfo>
            <InfoIcon />
          </CardInfo>
          <Scale scale={scale} />
        </CardContent>
      </Card>
      <InfoCard>
        <Container>
          <InfoCardContent>
            {status === 'PLAYING' && `${toDisplay(remainingTime)} - ${answered} ${I18n.get('out of')} ${questions.length} ${I18n.get('Answered').toLowerCase()}`}
            {status === 'PLAYED' && `${I18n.get('Your result:')} ${mark} / ${maxMark}`}
          </InfoCardContent>
        </Container>
      </InfoCard>
      {questions.map((q) => (
        <CandidateQuestionCard
          key={q.id}
          question={q}
          onUpdateAnswer={() => showSnackbar(I18n.get('Updated'))}
          onCreateAnswer={() => { setAnswered(answered + 1); showSnackbar(I18n.get('Created')); }}
          onDeleteAnswer={() => { setAnswered(answered - 1); showSnackbar(I18n.get('Canceled')); }}
          disabled={status !== 'PLAYING'}
        />
      ))}
    </>
  );
};

export default Questionnaire;
