import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

import TextField from '../TextField/TextField.component';
import Button from '../Button/Button.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignIn = (props) => {
  const { onStateChange } = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const signIn = async () => {
    await Auth.signIn(email, password);
    onStateChange('signedIn');
  };
  return (
    <>
      <CardContent>
        <Form>
          <TextField
            label="email"
            value={email}
            placeholder="name"
            onChange={setEmail}
          />
          <TextField
            label="Password"
            value={password}
            placeholder="password"
            onChange={setPassword}
            type="password"
          />
        </Form>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onStateChange('resettingPassword')}
        >
          Initialize account
        </Button>
        <Button
          onClick={() => onStateChange('forgotPassword')}
        >
          Reset Password
        </Button>
        <Button
          onClick={signIn}
          disabled={!email || !password}
        >
          Log in
        </Button>
      </CardActions>
    </>
  );
};

export default SignIn;
