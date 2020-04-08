import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link, useLocation } from 'react-router-dom';

import Button from '../Button/Button.component';

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor.primary};
  display: flex;
  justify-content: flex-end;
  height: 64px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding: 0 .8em;
  &:last-child {
    padding: 0;
    padding-right: .8em;
  }
`;

const AppBar = () => {
  const location = useLocation();
  const handleSignOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <ButtonContainer>
      {location.pathname !== '/' && (
        <Link to="/">
          <Button>
            Home
          </Button>
        </Link>
      )}
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={handleSignOut}>Sign out</Button>
      </ButtonContainer>
    </Container>
  );
};

export default AppBar;
