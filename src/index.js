import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import './index.css';
import { I18n } from 'aws-amplify';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import dict from './translations';
import { showSnackbar } from './components/Snackbar/Snackbar.component.jsx';

const theme = {
  backgroundColor: {
    primary: '#ff9900',
    secondary: '#ffc165',
    ternary: '#1529390f',
  },
  color: {
    primary: '#152939',
    secondary: 'white',
  },
  border: {
    primary: '#c4c4c4',
  },
};

I18n.putVocabularies(dict);
I18n.setLanguage('fr');

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

const onUpdate = (registration) => {
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  showSnackbar('Install the app on your home screen', () => {
    document.cookie = `installPromptCount=${0}`;
    e.prompt();
    e.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  });
});

serviceWorker.register({ onUpdate });
