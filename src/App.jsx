import React from 'react';
import { useDispatch, useStore } from 'react-redux';

import './App.css';
import MainRouter from './router';

import { initUser } from './redux/user/actions';
import { initPosts } from './redux/posts/actions';
import { initAdmin } from './redux/admin/actions';
import { initCategories } from './redux/categories/actions';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initUser());
    dispatch(initPosts());
    dispatch(initAdmin());
    dispatch(initCategories());
  });

  return (
    <MainRouter />
  );
};

export default App;
