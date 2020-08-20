import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

const onUpdate = (registration) => {
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.showSnackbar('Install the app on your home screen', () => {
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
