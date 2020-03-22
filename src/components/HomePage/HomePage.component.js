import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { createAnswer } from '../../graphql/mutations';
import Button from '../Button/Button.component';

const HomePage = () => {
  const handleAnswer = async () => {
    const answer = {
      id: '1',
      questionId: '1',
      answer: 'ma réponse',
    };
    await API.graphql(graphqlOperation(createAnswer, { input: answer }));
  };

  return (
    <Button primary onClick={handleAnswer}>Answer</Button>
  );
};

export default HomePage;
