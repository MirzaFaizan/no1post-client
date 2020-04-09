import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
} from 'react-redux';
import {
  BrowserRouter,
} from 'react-router-dom';

import store from './redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import './assets/css/react.css';
import './assets/css/style.css';
import './assets/css/scrollbar.css';

import App from './App';

ReactDOM.render(
  <Provider store={store()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
