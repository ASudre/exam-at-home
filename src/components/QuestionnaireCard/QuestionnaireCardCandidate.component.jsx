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
import { generateQuestionnaireReport } from '../../graphql/custom_queries';
import generateFile from './exportFile.utils';
import CardInfo from '../Card/CardInfo/CardInfo.component';
import CardTitle from '../Card/CardTitle/CardTitle.component';

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

const displayDate = (date) => (date ? moment(date).format('DD/MM/YYYY HH:mm') : 'Undefined');

const displayDuration = (duration) => `${duration} minute${duration > 1 ? 's' : ''}`;

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
        <CardInfo>
          <InfoTag>{displayDate(questionnaire.startTime)}</InfoTag>
          <InfoTag>{displayDuration(questionnaire.duration)}</InfoTag>
        </CardInfo>
        <CardTitle>{questionnaire.name}</CardTitle>
      </CardContent>
      <CardActions>
        {isAdmin && new Date(questionnaire.startTime) < new Date()
          && <Button
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
        {isAdmin && <Button onClick={onEdit}>
            Edit
          </Button>
        }
        <Link to={`/questionnaires/${questionnaire.id}`}>
          <Button>
            Start
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default QuestionCardCandidate;
