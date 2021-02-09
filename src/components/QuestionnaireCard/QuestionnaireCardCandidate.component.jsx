import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { graphqlOperation, API, I18n } from 'aws-amplify';
import { get } from 'lodash';

import Card from '../Card/Card.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import Button from '../Button/Button.component.jsx';
import { generateQuestionnaireReport } from '../../graphql/custom_queries';
import generateFile from './exportFile.utils';
import CardInfo from '../Card/CardInfo/CardInfo.component.jsx';
import CardTitle from '../Card/CardTitle/CardTitle.component.jsx';

const InfoTag = styled.div`
  align-self: flex-end;
  border: ${(props) => `1px solid ${props.theme.color.primary}`};
  padding: 3px;
  font-size: smaller;
  margin-left: 1em;
  border-radius: 4px;
  @media (max-width: 767px) {
    margin-left: .5em;
    font-size: small;
  }
`;

const displayDate = (date) => (date ? moment(date).format('DD/MM/YYYY HH:mm') : 'Undefined');

const displayDuration = (duration) => `${duration} ${I18n.get('Minutes').toLowerCase()}${duration > 1 ? 's' : ''}`;

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

const QuestionnaireCardCandidate = ({ questionnaire, onEdit, isAdmin }) => {
  const [exporting, setExporting] = useState(false);
  const isStarted = moment(questionnaire.startTime).isBefore(moment());
  const isFinished = moment(questionnaire.startTime).add(questionnaire.duration, 'minutes').isBefore(moment());

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
        {isAdmin && isFinished
          && <Button
            onClick={async () => {
              setExporting(true);
              generateFile('report.csv', await generateReport(questionnaire.id));
              setExporting(false);
            }}
            disabled={exporting}
          >
            {I18n.get('Export')}
          </Button>
        }
        {isAdmin && !isStarted && <Button onClick={onEdit}>
          {I18n.get('Configure')}
        </Button>
        }
        <Link to={`/questionnaires/${questionnaire.id}`}>
          {isAdmin && !isStarted && <Button>
            {I18n.get('Edit Questions')}
          </Button>}
          {!isAdmin && <Button>
            {I18n.get('Start')}
          </Button>}
        </Link>
      </CardActions>
    </Card>
  );
};

export default QuestionnaireCardCandidate;
