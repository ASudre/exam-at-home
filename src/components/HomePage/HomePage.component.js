import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import styled from 'styled-components';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { listQuestionnaires } from '../../graphql/queries';
import Button from '../Button/Button.component';
import Loader from '../Loader/Loader.component';
import Card from '../Card/Card.component';
import CardActions from '../Card/CardActions/CardActions.component';

const Container = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const refreshQuestionnairesList = (setQuestionnaires) => API
  .graphql(graphqlOperation(listQuestionnaires))
  .then((res) => setQuestionnaires(
    get(res, 'data.listQuestionnaires.items', [])
      .sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))),
  ))
  .catch((e) => {
    console.error(e);
  });

const HomePage = () => {
  const [questionnaires, setQuestionnaires] = useState(null);

  useEffect(() => {
    refreshQuestionnairesList(setQuestionnaires);
  }, []);

  return (
    !questionnaires
      ? <Loader />
      : <Container>
      {questionnaires.map((q) => (
        <Card key={q.id}>
            <CardActions>
              <Link to={`/questionnaires/${q.id}`}>
                <Button>{q.id}</Button>
              </Link>
            </CardActions>
          </Card>
      ))}
    </Container>
  );
};

export default HomePage;
