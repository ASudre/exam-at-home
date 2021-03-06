import React, {
  useEffect, useState, Suspense, lazy,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import {
  withAuthenticator,
} from 'aws-amplify-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@aws-amplify/ui/dist/style.css';

import awsconfig from './aws-exports';
import AppBar from './components/AppBar/AppBar.component.jsx';
import Layout from './components/Layout/Layout.component.jsx';
import Loader from './components/Loader/Loader.component.jsx';
import AuthComponent from './components/Auth/Auth.component.jsx';

const QuestionnairePage = lazy(() => import(/* webpackChunkName: 'QuestionnaireRoute' */ './components/QuestionnairePage/QuestionnairePage.component.jsx'));
const QuestionnairesPage = lazy(() => import(/* webpackChunkName: 'QuestionnairesRoute' */ './components/QuestionnairesPage/QuestionnairesPage.component.jsx'));

Amplify.configure(awsconfig);

const App = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setIsAdmin(
        user.signInUserSession.accessToken.payload['cognito:groups']
          ? user.signInUserSession.accessToken.payload['cognito:groups'].includes('Admin')
          : false,
      );
      setUsername(user.username);
    });
  }, []);

  return (<Router>
    <Layout header={<AppBar username={username} isAdmin={isAdmin} />}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/questionnaires/:id">
            <QuestionnairePage isAdmin={isAdmin} />
          </Route>
          <Route path="/">
            <QuestionnairesPage isAdmin={isAdmin} />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  </Router >
  );
};

export default withAuthenticator(
  App,
  {
    usernameAttributes: 'email',
    authenticatorComponents: [<AuthComponent />],
  },
);
