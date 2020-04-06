import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/HomePage';

const MainRouter = () => (
  <MainLayout>
    <Switch>
      <Route
        exact
        path="/"
        component={HomePage}
      />
      <Route
        path="*"
        component={() => <Redirect to="/" />}
      />
    </Switch>
  </MainLayout>
);

export default MainRouter;
