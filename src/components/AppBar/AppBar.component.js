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
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  padding: 0 .8em;
  white-space: nowrap;
  &:last-child {
    padding: 0;
    padding-right: .8em;
  }
`;

const Left = styled.div`
  padding: 0 .8em;
  color: ${(props) => props.theme.color.primary};
  overflow: hidden;
`;

const Right = styled.div`
  display: flex;
`;

const AppBar = ({username, isAdmin}) => {
  const location = useLocation();
  const handleSignOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Left>
        {`${username}${isAdmin ? ' (admin)' : ''}`}
      </Left>
      <Right>
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
      </Right>
    </Container>
  );
};

export default AppBar;
