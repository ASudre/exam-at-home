import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import styled from 'styled-components';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { listQuestionnaires } from '../../graphql/queries';
import Button from '../Button/Button.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HomePage = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  const refreshQuestionnairesList = () => API.graphql(graphqlOperation(listQuestionnaires))
    .then((res) => setQuestionnaires(
      get(res, 'data.listQuestionnaires.items', [])
        .sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))),
    ))
    .catch((e) => {
      console.error(e);
    });

  useEffect(() => {
    refreshQuestionnairesList();
  }, []);

  return <Container>
        {questionnaires.map((q) => (
          <Link key={q.id} to={`/${q.id}`}>
            <Button>{q.id}</Button>
          </Link>
        ))}
      </Container>;
};

export default HomePage;
