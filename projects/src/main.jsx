import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import gameState from './reducers/gameState';
import App from './components/App';
import './styles/reset.css';

const name = 'имя';
const app = <App name={name} />;

let options = null;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  options = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
} else {
  options = applyMiddleware(thunk);
}

export const store = createStore(
  gameState,
  options,
);

ReactDOM.render(
  <Provider store={store}>
    {app}
  </Provider>,
  document.getElementById('root'),
);
