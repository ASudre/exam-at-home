import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link, withRouter } from 'react-router-dom';

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

const AppBar = ({ location }) => {
  const [connectedUserGroups, setConnectedUserGroups] = useState([]);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setConnectedUserGroups(user.signInUserSession.accessToken.payload['cognito:groups']);
    });
  }, []);

  const handleSignOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <ButtonContainer>
      {connectedUserGroups.includes('Admin') && location.pathname !== '/admin' && (
        <Button>
          <Link to="/admin">
            Admin
          </Link>
        </Button>
      )}
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

export default withRouter(AppBar);
