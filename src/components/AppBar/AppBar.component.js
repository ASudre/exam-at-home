import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link, useLocation } from 'react-router-dom';

import Button from '../Button/Button.component';

const Container = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: flex-end;
  height: 64px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding: 0 20px;
  &:last-child {
    padding: 0;
    padding-right: 20px;
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
        <Button>
          <Link to="/">
            Home
          </Link>
        </Button>
      )}
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={handleSignOut}>Sign out</Button>
      </ButtonContainer>
    </Container>
  );
};

export default AppBar;
