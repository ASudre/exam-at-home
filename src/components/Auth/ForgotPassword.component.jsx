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

const ForgotPassword = (props) => {
  const { onStateChange, email, setEmail } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const sendCode = async () => {
    setError(null);
    try {
      await Auth.forgotPassword(email);
      onStateChange('resettingPassword');
    } catch (e) {
      setError(I18n.get('Could not send the code. Please check your email'));
    }
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendCode();
        setLoading(false);
      }}
    >
      <CardContent>
        <CardTitle>{I18n.get('Enter your email to receive a verification code')}</CardTitle>
        {!loading
          ? <TextField
            label={`${I18n.get('Email')} *`}
            value={email}
            placeholder={I18n.get('Email').toLowerCase()}
            onChange={setEmail}
            type="email"
          />
          : <Loader />
        }
        {error && <Error>{error}</Error>}
      </CardContent>
      <CardActions>
        <Button
          disabled={loading}
          onClick={() => onStateChange('signIn')}
          type="button"
        >
          {I18n.get('Back to Sign In')}
        </Button>
        <Button
          disabled={loading}
          type="submit"
        >
          {I18n.get('Send code')}
        </Button>
      </CardActions>
    </form>
  );
};

export default ForgotPassword;
