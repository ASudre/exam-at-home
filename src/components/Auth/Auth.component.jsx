import React from 'react';
import styled from 'styled-components';

import SignIn from './SignIn.component.jsx';
import ForgotPassword from './ForgotPassword.component.jsx';
import Card from '../Card/Card.component.jsx';
import Layout from '../Layout/Layout.component.jsx';

const Image = styled.img`
  width: 100%;
`;

const Auth = (props) => {
  const { authState, onStateChange } = props;
  return (
    <Layout header={<Image src="/header.png" alt="header" />}>
      <Card>
        {authState === 'signIn' && (<SignIn onStateChange={onStateChange} />)}
        {['forgotPassword', 'resettingPassword'].includes(authState) && (<ForgotPassword onStateChange={onStateChange} />)}
      </Card>
    </Layout>
  );
};

export default Auth;
