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
import Home from './components/HomePage/HomePage.component';
import Admin from './components/AdminQuestionnaire/AdminQuestionnaire.component';
import Candidate from './components/CandidateQuestionnaire/CandidateQuestionnaire.component';
import Layout from './components/Layout/Layout.component';

Amplify.configure(awsconfig);
const theme = {
  color: {
    primary: 'palevioletred',
    secondary: '#dd3f5b1f',
  },
};

const App = () => {
  const [connectedUserGroups, setConnectedUserGroups] = useState([]);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setConnectedUserGroups(user.signInUserSession.accessToken.payload['cognito:groups']);
    });
  }, []);

  return (
  <ThemeProvider theme={theme} >
    <Router>
      <Layout>
        <Switch>
          <Route path="/:id">
            {connectedUserGroups && connectedUserGroups.includes('Admin')
              ? <Admin/>
              : <Candidate />
            }
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
  );
};

export default withAuthenticator(App, { usernameAttributes: 'email' });
