import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import Questionnaire from '../Questionnaire/Questionnaire.component';
import Loader from '../Loader/Loader.component';

const QuestionnairePage = () => {
  const [connectedUserGroups, setConnectedUserGroups] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setConnectedUserGroups(user.signInUserSession.accessToken.payload['cognito:groups']);
    });
  }, []);

  return !connectedUserGroups
    ? <Loader />
    : <Questionnaire
        isAdmin={connectedUserGroups.includes('Admin')}
      />;
};

export default QuestionnairePage;
