import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Button from '../Button/Button.component';

const InfoTag = styled.div`
  align-self: flex-end;
  border: 1px solid palevioletred;
  padding: 2px;
  font-size: smaller;
  margin-left: 1em;
  border-radius: 2px;
  @media (max-width: 768px) {
    margin-left: .5em;
    font-size: x-small;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: large;
  margin: 5px 5px 0;
  @media (max-width: 768px) {
    margin: 10px 5px 0;
  }
`;

const displayDate = (date) => (date ? moment(date).format('DD/MM/YYYY HH:mm') : 'Undefined');

const QuestionCardCandidate = ({ questionnaire, onEdit, isAdmin }) => (
  <Card>
    <CardContent>
      <InfoContainer>
        <InfoTag>{displayDate(questionnaire.startTime)}</InfoTag>
        <InfoTag>{questionnaire.duration} minutes</InfoTag>
      </InfoContainer>
      <Title>{questionnaire.name}</Title>
    </CardContent>
    <CardActions>
      {isAdmin
      && <Button onClick={onEdit}>
        Edit
      </Button>
      }
      <Button>
        <Link to={`/questionnaires/${questionnaire.id}`}>
          Start
        </Link>
      </Button>
    </CardActions>
  </Card>
);

export default QuestionCardCandidate;
