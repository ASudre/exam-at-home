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

const ResettingPassword = (props) => {
  const { onStateChange, email } = props;
  const [newPassword, setNewPassword] = useState();
  const [newPasswordBis, setNewPasswordBis] = useState();
  const [code, setCode] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const sendCode = async () => {
    setError(null);
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      onStateChange('signIn');
    } catch (e) {
      setError(I18n.get('Error while renewing your password. Please check your code. Minimum 8 characters for the password'));
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
        <CardTitle>{I18n.get('Enter the code received by email and change your password')}</CardTitle>
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
          disabled={loading}
          type="submit"
        >
          {I18n.get('Validate')}
        </Button>
      </CardActions>
    </form>
  );
};

export default ResettingPassword;
