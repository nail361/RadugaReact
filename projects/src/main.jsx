import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gameState from './reducers/gameState';
import App from './components/App';
import './styles/reset.css';

const name = 'имя';
const app = <App name={name} />;
const store = createStore(
  gameState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    {app}
  </Provider>,
  document.getElementById('root'),
);
