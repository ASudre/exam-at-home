import React, { useState } from 'react';
import { Auth, I18n } from 'aws-amplify';
import styled from 'styled-components';

import TextField from '../TextField/TextField.component.jsx';
import Button from '../Button/Button.component.jsx';
import Loader from '../Loader/Loader.component.jsx';
import CardActions from '../Card/CardActions/CardActions.component.jsx';
import CardContent from '../Card/CardContent/CardContent.component.jsx';
import CardTitle from '../Card/CardTitle/CardTitle.component.jsx';

const Error = styled.div`
  color: red;
`;

const SignIn = (props) => {
  const { onStateChange, email, setEmail } = props;
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await signIn();
        setLoading(false);
      }}
    >
      <CardContent>
        <CardTitle>{I18n.get('Sign in to your account')}</CardTitle>
        {!loading
          ? <>
            <TextField
              label={`${I18n.get('Email')} *`}
              value={email}
              placeholder={I18n.get('Email').toLowerCase()}
              onChange={setEmail}
              type="email"
            />
            <TextField
              label={`${I18n.get('Password')} *`}
              value={password}
              placeholder={I18n.get('Password').toLowerCase()}
              onChange={setPassword}
              type="password"
            />
          </>
          : <Loader />
        }
        {error && <Error>
          {I18n.get('Could not log you in. Check your email or password. If it is your first time on the website, use "Initialize account"')}
        </Error>}
      </CardContent>
      <CardActions>
        <Button
          disabled={loading}
          onClick={() => onStateChange('forgotPassword')}
          type="button"
        >
          {I18n.get('Sign Up')}
        </Button>
        <Button
          disabled={loading}
          onClick={() => onStateChange('forgotPassword')}
          type="button"
        >
          {I18n.get('Reset Password')}
        </Button>
        <Button
          disabled={loading}
          type="submit"
        >
          {I18n.get('Sign In')}
        </Button>
      </CardActions>
    </form>
  );
};

export default SignIn;
