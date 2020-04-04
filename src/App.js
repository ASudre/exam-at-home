import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Amplify from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';
import Home from './components/HomePage/HomePage.component';
import Layout from './components/Layout/Layout.component';
import QuestionnairePage from './components/QuestionnairePage/QuestionnairePage.component';

Amplify.configure(awsconfig);
const theme = {
  color: {
    primary: 'palevioletred',
    secondary: '#dd3f5b1f',
  },
};

const App = () => (
<ThemeProvider theme={theme} >
    <Router>
      <Layout>
        <Switch>
          <Route path="/questionnaires/:id">
            <QuestionnairePage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
);

export default withAuthenticator(App, { usernameAttributes: 'email' });
