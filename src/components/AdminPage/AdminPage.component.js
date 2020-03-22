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

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${(props) => `2px solid ${props.theme.main}`};
  border-radius: 3px;
`;

const answerValues = ['A', 'B', 'C', 'D'];

const AdminPage = () => {
  const imageInput = useRef();
  const [questions, setQuestions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [answerValue, setAnswerValue] = useState(answerValues[0]);

  useEffect(() => {
    API.graphql(graphqlOperation(listQuestions))
      .then((res) => setQuestions(get(res, 'data.listQuestions.items', [])))
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const saveQuestion = () => {
    const questionId = uuid.v4();
    Storage.put(questionId, imageFile, {
      contentType: 'image/png',
    })
      .then(async () => {
        const answer = {
          id: questionId,
          image: {
            key: questionId,
          },
        };
        await API.graphql(graphqlOperation(createQuestion, { input: answer }));
      })
      .catch(console.error);
  };

  const onImageInputClick = () => {
    imageInput.current.click();
  };

  return (
    <Container>
      {questions.map((q) => (
        <Card key={q.id}>
          <S3Image imgKey={q.image.key} alt="question"/>
        </Card>
      ))}
      <Card>
        <div>
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
        </div>
        <Button disabled={!answerValue || !imageFile} onClick={saveQuestion}>
          Save
        </Button>
      </Card>
    </Container>
  );
};

export default AdminPage;
