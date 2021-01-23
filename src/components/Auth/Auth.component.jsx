import React from 'react';
import styled from 'styled-components';

import SignIn from './SignIn.component';
import ForgotPassword from './ForgotPassword.component';
import Card from '../Card/Card.component';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Image = styled.img`
  position: absolute;
  margin: auto;
  width: 100%;
`;

const Auth = (props) => {
  const { authState, onStateChange } = props;

  return (<>
    <Image src="/header.png" alt="header" />
    <Container>
      <Card>
        {authState === 'signIn' && (<SignIn onStateChange={onStateChange} />)}
        {['forgotPassword', 'resettingPassword'].includes(authState) && (<ForgotPassword onStateChange={onStateChange} />)}
      </Card>
    </Container>
  </>);
};

export default Auth;
