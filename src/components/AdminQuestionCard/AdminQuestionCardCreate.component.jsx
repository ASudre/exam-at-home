import React, { useState, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { I18n } from 'aws-amplify';

import Button from '../Button/Button.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import Card from '../Card/Card.component.jsx';
import RadioButtons from '../RadioButtons/RadioButtons.component.jsx';
import FileInput from '../FileInput/FileInput.component.jsx';
import AddIcon from '../AddIcon/AddIcon.component.jsx';

const answerValues = ['A', 'B', 'C', 'D'];

const QuestionCardCreate = ({
  questionnaireId, onSave,
}) => {
  const initState = {
    answer: null,
    imageFile: {},
  };
  const [addQuestionFormOpened, setAddQuestionFormOpened] = useState(false);
  const [answer, setAnswer] = useState(initState.answer);
  const [imageFile, setImageFile] = useState(initState.imageFile);

  const imageInput = useRef();
  const onImageInputClick = () => {
    imageInput.current.click();
  };

  const buildInput = () => {
    const questionId = uuidV4();
    return {
      id: questionId,
      questionQuestionnaireId: questionnaireId,
      answer,
      imageKey: `${questionnaireId}/${questionId}`,
      imageName: imageFile.name,
    };
  };

  return (
    !addQuestionFormOpened
      ? <AddIcon onClick={() => setAddQuestionFormOpened(true)} />
      : (<Card>
        <CardContent>
          <Button onClick={onImageInputClick}>
            {imageFile.name || 'Select image'}
          </Button>
          <FileInput ref={imageInput} setFile={setImageFile} />
          <RadioButtons
            values={answerValues}
            setValue={setAnswer}
            checkedValue={answer}
          />
        </CardContent>
        <CardActions>
          <Button onClick={() => setAddQuestionFormOpened(false)}>
            {I18n.get('Cancel')}
          </Button>
          <Button
            disabled={!imageFile.name || !answer}
            onClick={() => onSave(buildInput(), imageFile).then(() => {
              setImageFile(initState.imageFile);
              setAnswer(initState.answer);
              setAddQuestionFormOpened(false);
            })}
          >
            {I18n.get('Save')}
          </Button>
        </CardActions>
      </Card>
      )
  );
};

export default QuestionCardCreate;
