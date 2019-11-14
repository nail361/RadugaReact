import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const name = 'Denis';
const app = <App name={name} />;

ReactDOM.render(
  app,
  document.getElementById('root'),
);

// ReactDOM.render(<App />, document.getElementById("root"));
