import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

import TextField from '../TextField/TextField.component';
import Button from '../Button/Button.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';
import CardTitle from '../Card/CardTitle/CardTitle.component';

const Error = styled.div`
  color: red;
`;

const SignIn = (props) => {
  const { onStateChange } = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const signIn = async () => {
    setError(false);
    try {
      await Auth.signIn(email, password);
      onStateChange('signedIn');
    } catch (e) {
      setError(true);
    }
  };
  return (
    <>
      <CardContent>
        <CardTitle>Sign in to your account</CardTitle>
        <TextField
          label="email *"
          value={email}
          placeholder="name"
          onChange={setEmail}
        />
        <TextField
          label="password *"
          value={password}
          placeholder="password"
          onChange={setPassword}
          type="password"
        />
        {error && <Error>
          Could not log you in. Check your email or password.
          If it is your first time on the website, use "Initialize account".
        </Error>}
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
        >
          Log in
        </Button>
      </CardActions>
    </>
  );
};

export default SignIn;
