import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const name = 'имя';
const app = <App name={name} />;

ReactDOM.render(
  app,
  document.getElementById('root'),
);
