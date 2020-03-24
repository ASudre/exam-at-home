import React, { useState, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { IoIosAddCircleOutline } from 'react-icons/io';
import styled from 'styled-components';

import Button from '../Button/Button.component';
import CardContent from '../Card/CardContent/CardContent.component';
import CardActions from '../Card/CardActions/CardActions.component';
import Card from '../Card/Card.component';
import RadioButtons from '../RadioButtons/RadioButtons.component';
import FileInput from '../FileInput/FileInput.component';

const answerValues = ['A', 'B', 'C', 'D'];

const AddQuestion = styled.div`
  font-size: 80px;
  @media (max-width: 768px) {
    font-size: 60px;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  > svg {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.primary};
    :hover {
      background-color: ${(props) => props.theme.color.secondary};
      color: ${(props) => props.theme.color.primary};
    }
    border-radius: 50%;
    border: ${(props) => (`2px solid ${props.theme.color.primary}`)};
  }
`;

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
      questionnaireId,
      answer,
      imageKey: `${questionnaireId}/${questionId}`,
      imageName: imageFile.name,
    };
  };

  return (
    !addQuestionFormOpened
      ? <AddQuestion>
          <IoIosAddCircleOutline onClick={() => setAddQuestionFormOpened(true)} />
        </AddQuestion>
      : (<Card>
          <CardContent>
            <Button primary onClick={onImageInputClick}>
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
            <Button primary onClick={() => setAddQuestionFormOpened(false)}>
              Cancel
            </Button>
            <Button
              primary
              disabled={!imageFile.name || !answer}
              onClick={() => onSave(imageFile, buildInput()).then(() => {
                setImageFile(initState.imageFile);
                setAnswer(initState.answer);
                setAddQuestionFormOpened(false);
              })}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      )
  );
};

export default QuestionCardCreate;
