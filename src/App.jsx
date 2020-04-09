import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './App.css';
import MainRouter from './router';

import {
  X_AUTH_TOKEN,
  X_AUTH_TOKEN_ADMIN,
} from './types';

import { initUser, registerAsGuest } from './redux/user/actions';
import { initPosts } from './redux/posts/actions';
import { initAdmin } from './redux/admin/actions';
import { initCategories } from './redux/categories/actions';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const hasRun = false;

    const loadData = (success) => {
      if (!hasRun && success) {
        dispatch(initPosts());
        dispatch(initCategories());
      }
    };

    const token = localStorage.getItem(X_AUTH_TOKEN);

    dispatch(initAdmin(() => {}));

    if (token) {
      dispatch(initUser(loadData));
    } else {
      dispatch(registerAsGuest(loadData));
    }
  });

  return (
    <MainRouter />
  );
};

export default App;
