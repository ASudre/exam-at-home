import React, { useState } from 'react';
import styled from 'styled-components';

import SignIn from './SignIn.component.jsx';
import ForgotPassword from './ForgotPassword.component.jsx';
import ResettingPassword from './ResettingPassword.component.jsx';
import Card from '../Card/Card.component.jsx';
import Layout from '../Layout/Layout.component.jsx';

const Image = styled.img`
  width: 100%;
`;

const Auth = (props) => {
  const { authState, onStateChange } = props;
  const [email, setEmail] = useState();
  return (
    <Layout header={<Image src="/header.png" alt="header" />}>
      <Card>
        {authState === 'signIn' && (<SignIn onStateChange={onStateChange} email={email} setEmail={setEmail} />)}
        {authState === 'forgotPassword' && (<ForgotPassword onStateChange={onStateChange} email={email} setEmail={setEmail} />)}
        {authState === 'resettingPassword' && (<ResettingPassword onStateChange={onStateChange} email={email} />)}
      </Card>
    </Layout>
  );
};

export default Auth;
