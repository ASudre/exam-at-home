import React from 'react';
import styled from 'styled-components';

import SignIn from './SignIn.component';
import ForgotPassword from './ForgotPassword.component';
import Card from '../Card/Card.component';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
`;

const Image = styled.img`
  width: 100%;
  padding-bottom: 1em;
`;

const Auth = (props) => {
  const { authState, onStateChange } = props;

  return (<>
    <Container>
      <Image src="/header.png" alt="header" />
      <Card>
        {authState === 'signIn' && (<SignIn onStateChange={onStateChange} />)}
        {['forgotPassword', 'resettingPassword'].includes(authState) && (<ForgotPassword onStateChange={onStateChange} />)}
      </Card>
    </Container>
  </>);
};

export default Auth;
