import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';
import Questionnaires from './components/QuestionnairesPage/QuestionnairesPage.component';
import Layout from './components/Layout/Layout.component';
import QuestionnairePage from './components/QuestionnairePage/QuestionnairePage.component';

Amplify.configure(awsconfig);
const theme = {
  color: {
    primary: 'palevioletred',
    secondary: '#dd3f5b1f',
  },
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('Admin'));
    });
  }, []);

  return (<ThemeProvider theme={theme} >
    <Router>
      <Layout>
        <Switch>
          <Route path="/questionnaires/:id">
            <QuestionnairePage isAdmin={isAdmin} />
          </Route>
          <Route path="/">
            <Questionnaires isAdmin={isAdmin} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
  );
};

export default withAuthenticator(App, { usernameAttributes: 'email' });
