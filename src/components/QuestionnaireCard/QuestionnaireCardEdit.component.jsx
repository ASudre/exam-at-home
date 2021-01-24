import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';
import Button from '../Button/Button.component';
import TextField from '../TextField/TextField.component';

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
            <TextField
              label="Name"
              value={name}
              placeholder="name"
              onChange={setName}
            />
            <TextField
              label="Date"
              value={startTime}
              placeholder="01/01/2020 16:00"
              onChange={setStartTime}
            />
            <TextField
              label="Duration (minutes)"
              value={duration}
              placeholder="20"
              onChange={setDuration}
            />
        </CardContent>
        <CardActions>
          <Button onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={() => ((questionnaire.id
            ? onUpdate(buildInput())
            : onCreate(buildInput()).then(() => {
              setStartTime(defaultQuestionnaire.startTime);
              setDuration(defaultQuestionnaire.duration);
              setName(defaultQuestionnaire.name);
            })
          ))}>
            Save
          </Button>
          {questionnaire.id
            && <Button
              onClick={() => onDelete({ id: questionnaire.id })}
            >
              Delete
            </Button>
          }
        </CardActions>
      </Card>;
};

export default QuestionnaireCard;
