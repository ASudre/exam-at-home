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
import Admin from './components/AdminPage/AdminPage.component';
import Layout from './components/Layout/Layout.component';

Amplify.configure(awsconfig);
const theme = {
  main: 'palevioletred',
};

const App = () => (
  <ThemeProvider theme={theme} >
    <Router>
      <Layout>
        <Switch>
          <Route path="/admin">
            <Admin />
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
