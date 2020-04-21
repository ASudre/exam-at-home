import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import styled from 'styled-components';

import CandidateQuestionCard from '../CandidateQuestionCard/CandidateQuestionCard.component';
import Card from '../Card/Card.component';
import CardContent from '../Card/CardContent/CardContent.component';

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

const getAnswered = (questions) => questions.reduce((acc, q) => (q.answers.items.length > 0 ? acc + 1 : acc), 0);

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
  const format = (nbPts => `${nbPts}pt${nbPts > 1 ? 's' : ''}`);
  return <FlexContainer>
    <div>Correct answer: {format(scale[0])}</div>
    <div>Wrong answer: {format(scale[1])}</div>
    <div>No answer: {format(scale[2])}</div>
  </FlexContainer>
};

const Questionnaire = ({ questionnaire, onTimeIsUp }) => {
  const scale = [2, -0.5, 0];
  const { status, remainingTime: initRemainingTime } = questionnaire;
  const [remainingTime, setRemainingTime] = useState(
    initRemainingTime,
  );
  const questions = get(questionnaire, 'questions.items', []);
  const [answered, setAnswered] = useState(getAnswered(questions));
  const [mark, setMark] = useState();

  useEffect(() => {
    if (status === 'PLAYING') {
      if (remainingTime === 0) {
        onTimeIsUp();
      } else {
        setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
      }
    }
  }, [remainingTime, onTimeIsUp, status]);

  useEffect(() => {
    if (status === 'PLAYED') {
      setMark(getMark(questions, scale));
    }
  }, [status, questions, scale]);

  return (
    <>
      <Card>
        <CardContent>
          <Scale scale={scale} />
        </CardContent>
      </Card>
      <InfoCard>
        <Container>
          <InfoCardContent>
            {questionnaire.status === "PLAYING" && `${toDisplay(remainingTime)} - ${answered} out of ${questions.length} answered`}
            {questionnaire.status === "PLAYED" && `Your result: ${mark}pt${mark > 1 ? 's' : ''}`}
          </InfoCardContent>
        </Container>
      </InfoCard>
      {questions.map((q) => (
        <CandidateQuestionCard
          key={q.id}
          question={q}
          onCreateAnswer={() => setAnswered(answered + 1)}
          onDeleteAnswer={() => setAnswered(answered - 1)}
          disabled={questionnaire.status !== "PLAYING"}
        />
      ))}
    </>
  );
};

export default Questionnaire;
