import React, { useEffect, useState, useRef } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import styled from 'styled-components';
import uuid from 'uuid';
import { get } from 'lodash';

import { createQuestion } from '../../graphql/mutations';
import Button from '../Button/Button.component';
import { listQuestions } from '../../graphql/queries';

const Container = styled.div`
  padding: 10px;
`;

const Select = styled.select`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${(props) => `2px solid ${props.theme.main}`};
  border-radius: 3px;
  cursor: pointer;
  height: 1.8em;
  `;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${(props) => `2px solid ${props.theme.main}`};
  border-radius: 10px;
  align-items: flex-end;
`;

const answerValues = ['A', 'B', 'C', 'D'];

const AdminPage = () => {
  const questionnaireId = '01b9162e-820e-42ce-a4f7-59ccf99a2642';
  const imageInput = useRef();
  const [questions, setQuestions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [answerValue, setAnswerValue] = useState(answerValues[0]);

  const updateQuestionsList = () => {
    API.graphql(graphqlOperation(listQuestions))
      .then((res) => setQuestions(get(res, 'data.listQuestions.items', [])))
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(updateQuestionsList, []);

  const updateQuestion = (questionId) => {
    // TODO
    console.log('update:', questionId);
  };

  const saveQuestion = () => {
    const questionId = uuid.v4();
    const imageKey = `${questionnaireId}/${questionId}`;
    Storage.put(imageKey, imageFile, {
      contentType: 'image/png',
    })
      .then(async () => {
        const question = {
          id: questionId,
          imageKey,
          answer: answerValue,
          questionnaireId,
        };
        return API.graphql(graphqlOperation(createQuestion, { input: question }));
      }).then(updateQuestionsList)
      .catch(console.error);
  };

  const onImageInputClick = () => {
    imageInput.current.click();
  };

  return (
    <Container>
      {questions.map((q) => (
        <Card key={q.id}>
          <CardContent>
            <S3Image imgKey={q.imageKey} alt="question"/>
            <Select id="answer" value={q.answer} onChange={(e) => { setAnswerValue(e.target.value); }} >
            ${answerValues.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
            </Select>
          </CardContent>
          <Button disabled={!answerValue || !imageFile} onClick={() => updateQuestion(q.id)}>
            Update
          </Button>
        </Card>
      ))}
      <Card>
        <CardContent>
          <Button onClick={onImageInputClick}>
            {imageFile ? imageFile.name : 'Select image'}
          </Button>
          <input
            hidden
            ref={imageInput}
            type="file" accept='image/png'
            onChange={(e) => { setImageFile(e.target.files[0]); }}
          />
          <Select id="answer" value={answerValue} onChange={(e) => { setAnswerValue(e.target.value); }} >
            ${answerValues.map((a) => (
              <option key={a} value={a}>{a}</option>
          ))}
          </Select>
        </CardContent>
        <Button disabled={!answerValue || !imageFile} onClick={saveQuestion}>
          Save
        </Button>
      </Card>
    </Container>
  );
};

export default AdminPage;
