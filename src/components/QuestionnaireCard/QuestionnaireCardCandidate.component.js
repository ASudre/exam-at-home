import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { graphqlOperation, API } from 'aws-amplify';
import { get } from 'lodash';

import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Button from '../Button/Button.component';
import { generateQuestionnaireReport } from './../../graphql/custom_queries';
import generateFile from './exportFile.utils';

const InfoTag = styled.div`
  align-self: flex-end;
  border: ${(props) => `1px solid ${props.theme.color.primary}`};
  padding: 3px;
  font-size: smaller;
  margin-left: 1em;
  border-radius: 4px;
  @media (max-width: 768px) {
    margin-left: .5em;
    font-size: small;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 1.1em;
  margin: 5px 5px 0;
  @media (max-width: 768px) {
    margin: 10px 5px 0;
  }
`;

const displayDate = (date) => (date ? moment(date).format('DD/MM/YYYY HH:mm') : 'Undefined');

const displayDuration = (duration) => `${duration} minute${duration > 1 ? 's' : ''}`

const generateReport = async (id) => API
  .graphql(
    graphqlOperation(generateQuestionnaireReport,
    {
      id,
    }),
  )
  .then((res) => get(res, 'data.generateQuestionnaireReport', ''))
  .catch((e) => {
    console.error(e);
  });

const QuestionCardCandidate = ({ questionnaire, onEdit, isAdmin }) => {
  const [exporting, setExporting] = useState(false);

  return (
    <Card>
      <CardContent>
        <InfoContainer>
          <InfoTag>{displayDate(questionnaire.startTime)}</InfoTag>
          <InfoTag>{displayDuration(questionnaire.duration)}</InfoTag>
        </InfoContainer>
        <Title>{questionnaire.name}</Title>
      </CardContent>
      <CardActions>
        {isAdmin && new Date(questionnaire.startTime) < new Date() &&
          <Button
            onClick={async () => {
              setExporting(true);
              generateFile('report.csv', await generateReport(questionnaire.id));
              setExporting(false);
            }}
            disabled={exporting}
          >
            Export
          </Button>
        }
        <Button onClick={onEdit}>
          Edit
        </Button>
        <Link to={`/questionnaires/${questionnaire.id}`}>
          <Button>
            Start
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
};

export default QuestionCardCandidate;
