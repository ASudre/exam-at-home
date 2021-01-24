import React, { useState } from 'react';
import { Auth, I18n } from 'aws-amplify';
import styled from 'styled-components';

import TextField from '../TextField/TextField.component.jsx';
import Button from '../Button/Button.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import CardTitle from '../Card/CardTitle/CardTitle.component.jsx';

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
        <CardTitle>{I18n.get('Sign in to your account')}</CardTitle>
        <TextField
          label={`${I18n.get('Email')} *`}
          value={email}
          placeholder={I18n.get('Email').toLowerCase()}
          onChange={setEmail}
        />
        <TextField
          label={`${I18n.get('Password')} *`}
          value={password}
          placeholder={I18n.get('Password').toLowerCase()}
          onChange={setPassword}
          type="password"
        />
        {error && <Error>
          {I18n.get('Could not log you in. Check your email or password. If it is your first time on the website, use "Initialize account"')}
        </Error>}
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onStateChange('resettingPassword')}
        >
          {I18n.get('Sign Up')}
        </Button>
        <Button
          onClick={() => onStateChange('forgotPassword')}
        >
          {I18n.get('Reset Password')}
        </Button>
        <Button
          onClick={signIn}
        >
          {I18n.get('Sign In')}
        </Button>
      </CardActions>
    </>
  );
};

export default SignIn;
