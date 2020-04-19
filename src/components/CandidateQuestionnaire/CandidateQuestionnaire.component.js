import React, { useState, useEffect } from "react";
import { get } from "lodash";
import styled from "styled-components";

import CandidateQuestionCard from "../CandidateQuestionCard/CandidateQuestionCard.component";
import Card from "../Card/Card.component";
import CardContent from "../Card/CardContent/CardContent.component";

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

const toDisplay = (seconds) =>
  seconds > 0
    ? `${Math.floor(seconds / 60)} min
  ${seconds % 60} sec`
    : "0 sec";

const getAnswered = (questions) =>
  questions.reduce((acc, q) => (q.answers.items.length > 0 ? acc + 1 : acc), 0);

const Questionnaire = ({ questionnaire, onTimeIsUp }) => {
  const { status, remainingTime: initRemainingTime } = questionnaire;
  const [remainingTime, setRemainingTime] = useState(
    initRemainingTime
  );
  const questions = get(questionnaire, "questions.items", []);
  const [answered, setAnswered] = useState(getAnswered(questions));

  useEffect(() => {
    if (status === 'PLAYING') {
      if (remainingTime === 0) {
        onTimeIsUp();
      } else {
        setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
      }
    }
  }, [remainingTime, onTimeIsUp, status]);

  return (
    <>
      <InfoCard>
        <Container>
          <InfoCardContent>
            {questionnaire.status === "PLAYING"
              ? `${toDisplay(remainingTime)} - `
              : ""}
            {answered} on {questions.length} answered
          </InfoCardContent>
        </Container>
      </InfoCard>
      {questions.map((q) => (
        <CandidateQuestionCard
          key={q.id}
          question={q}
          onCreateAnswer={() => setAnswered(answered + 1)}
          disabled={questionnaire.status !== "PLAYING"}
        />
      ))}
    </>
  );
};

export default Questionnaire;
