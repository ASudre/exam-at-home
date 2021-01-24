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
        console.log('e1', e);
        setError('Could not send the code. Please check your email.');
      }
    } else {
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        onStateChange('signIn');
      } catch (e) {
        console.log('e2', e);
        setError('Error while renewing your password. Please check your code.');
      }
    }
  };
  return (
    <>
      <CardContent>
        {!isCodeSent && (<CardTitle>Enter your email to receive a code</CardTitle>)}
        {isCodeSent && (<CardTitle>Enter the code received by email and change your password</CardTitle>)}
        {!isCodeSent && <TextField
          label="email *"
          value={email}
          placeholder="name"
          onChange={setEmail}
        />}
        {isCodeSent && (
          <>
            <TextField
              label="Code *"
              value={code}
              placeholder="code"
              onChange={setCode}
            />
            <TextField
              label="New password *"
              value={newPassword}
              placeholder="new password"
              onChange={setNewPassword}
              type="password"
            />
            <TextField
              label="Confirm new password *"
              value={newPasswordBis}
              placeholder="confirm new password"
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
        >
          Back to Sign In
        </Button>
        <Button
          onClick={sendCode}
        >
          Send code
        </Button>
      </CardActions>
    </>
  );
};

export default ForgotPassword;
