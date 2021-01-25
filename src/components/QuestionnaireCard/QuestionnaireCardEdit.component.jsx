import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';
import { I18n } from 'aws-amplify';

import Card from '../Card/Card.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import CardTitle from '../Card/CardTitle/CardTitle.component.jsx';
import Button from '../Button/Button.component.jsx';
import TextField from '../TextField/TextField.component.jsx';

const dateFormat = 'DD/MM/YYYY HH:mm';
const defaultQuestionnaire = {
  name: '',
  startTime: '',
  duration: '',
};

const QuestionnaireCard = ({
  questionnaire = defaultQuestionnaire, onClose, onUpdate, onDelete, onCreate,
}) => {
  const [name, setName] = useState(questionnaire.name);
  const [startTime, setStartTime] = useState(
    questionnaire.startTime && moment(questionnaire.startTime).format(dateFormat),
  );
  const [duration, setDuration] = useState(questionnaire.duration);

  const formatDate = (toFormatDate) => moment(toFormatDate, dateFormat).toISOString();

  const buildInput = () => ({
    id: questionnaire && questionnaire.id ? questionnaire.id : uuidV4(),
    name,
    duration,
    startTime: formatDate(startTime),
  });

  return <Card>
    <CardContent>
      <CardTitle>{questionnaire.id
        ? I18n.get('Edit a questionnaire')
        : I18n.get('Create a questionnaire')
      }</CardTitle>
      <TextField
        label={I18n.get('Name')}
        value={name}
        placeholder={I18n.get('Name').toLowerCase()}
        onChange={setName}
      />
      <TextField
        label={I18n.get('Date')}
        value={startTime}
        placeholder="01/01/2020 16:00"
        onChange={setStartTime}
      />
      <TextField
        label={`${I18n.get('Duration')} (${I18n.get('Minutes').toLowerCase()}s)`}
        value={duration}
        placeholder="20"
        onChange={setDuration}
      />
    </CardContent>
    <CardActions>
      {questionnaire.id
        && <Button
          onClick={() => onDelete({ id: questionnaire.id })}
        >
          {I18n.get('Delete')}
        </Button>
      }
      <Button onClick={() => onClose()}>
        {I18n.get('Cancel')}
      </Button>
      <Button onClick={() => ((questionnaire.id
        ? onUpdate(buildInput())
        : onCreate(buildInput()).then(() => {
          setStartTime(defaultQuestionnaire.startTime);
          setDuration(defaultQuestionnaire.duration);
          setName(defaultQuestionnaire.name);
        })
      ))}>
        {I18n.get('Save')}
      </Button>
    </CardActions>
  </Card>;
};

export default QuestionnaireCard;
