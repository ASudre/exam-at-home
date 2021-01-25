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

const ForgotPassword = (props) => {
  const { onStateChange } = props;
  const [isCodeSent, setIsCodeSent] = useState();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordBis, setNewPasswordBis] = useState();
  const [code, setCode] = useState();
  const [error, setError] = useState();
  const sendCode = async () => {
    setError(null);
    if (!isCodeSent) {
      try {
        await Auth.forgotPassword(email);
        setIsCodeSent(true);
      } catch (e) {
        setError(I18n.get('Could not send the code. Please check your email'));
      }
    } else {
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        onStateChange('signIn');
      } catch (e) {
        setError(I18n.get('Error while renewing your password. Please check your code. Minimum 8 characters for the password'));
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendCode();
      }}
    >
      <CardContent>
        {!isCodeSent && (<CardTitle>{I18n.get('Enter your email to receive a verification code')}</CardTitle>)}
        {isCodeSent && (
          <CardTitle>{I18n.get('Enter the code received by email and change your password')}</CardTitle>
        )}
        {!isCodeSent && <TextField
          label={`${I18n.get('Email')} *`}
          value={email}
          placeholder={I18n.get('Email').toLowerCase()}
          onChange={setEmail}
          type="email"
        />}
        {isCodeSent && (
          <>
            <TextField
              label={`${I18n.get('Code')} *`}
              value={code}
              placeholder={I18n.get('Code').toLowerCase()}
              onChange={setCode}
            />
            <TextField
              label={`${I18n.get('New Password')} *`}
              value={newPassword}
              placeholder={I18n.get('New Password').toLowerCase()}
              onChange={setNewPassword}
              type="password"
            />
            <TextField
              label={`${I18n.get('Confirm New Password')} *`}
              value={newPasswordBis}
              placeholder={I18n.get('Confirm New Password').toLowerCase()}
              onChange={setNewPasswordBis}
              type="password"
            />
          </>
        )}
        {error && <Error>{error}</Error>}
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onStateChange('signIn')}
          type="button"
        >
          {I18n.get('Back to Sign In')}
        </Button>
        <Button
          onClick={sendCode}
          type="submit"
        >
          {!isCodeSent
            ? I18n.get('Send code')
            : I18n.get('Validate')}
        </Button>
      </CardActions>
    </form>
  );
};

export default ForgotPassword;
