import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

import TextField from '../TextField/TextField.component';
import Button from '../Button/Button.component';
import CardActions from '../Card/CardActions/CardActions.component';
import CardContent from '../Card/CardContent/CardContent.component';

const ForgotPassword = (props) => {
  const { onStateChange } = props;
  const [isCodeSent, setIsCodeSent] = useState();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordBis, setNewPasswordBis] = useState();
  const [code, setCode] = useState();
  const sendCode = async () => {
    if (!isCodeSent) {
      await Auth.forgotPassword(email);
      setIsCodeSent(true);
    } else {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      onStateChange('signIn');
    }
  };
  return (
    <>
      <CardContent>
        {!isCodeSent && (<h3>Enter your email to receive a code</h3>)}
        {isCodeSent && (<h3>Enter the code received by email and change your password</h3>)}
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
