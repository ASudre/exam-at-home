import React from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import logo from './logo.svg';
import './App.css';
import { createAnswer } from './graphql/mutations';

Amplify.configure(awsconfig);

const App = () => {
  const handleSignOut = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  const handleAnswer = async () => {
    const answer = {
      id: '1',
      questionId: '1',
      userId: '1',
      answer: 'ma réponse',
    };
    const newTodo = await API.graphql(graphqlOperation(createAnswer, {input: answer}));
    alert(JSON.stringify(newTodo));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div onClick={handleSignOut}>Sign out</div>
        <div onClick={handleAnswer}>Answer</div>

      </header>
    </div>
  );
}

export default withAuthenticator(App, { usernameAttributes: 'email' });
