import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/reset.css';

const name = 'имя';
const app = <App name={name} />;

ReactDOM.render(
  app,
  document.getElementById('root'),
);
