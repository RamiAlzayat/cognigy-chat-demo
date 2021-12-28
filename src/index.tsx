import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

console.log(
  '%c Cognigy Chat bot 💬',
  'font-family: sans-serif; font-weight: bold; font-size: 18px;color: white; text-shadow: 1px 1px 0 gray',
);

serviceWorker.unregister();
