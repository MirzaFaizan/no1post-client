import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';

import LoginPage from '../pages/admin/LoginPage';

const MainRouter = () => (
  <>
    <input type="hidden" />
    <Switch>
      <Route
        exact
        path="/admin/login"
        component={LoginPage}
      />
      <Route
        path="/admin"
        component={AdminRouter}
      />
      <Route
        path="/"
        component={ClientRouter}
      />
      <Route
        path="*"
        component={() => <Redirect to="/" />}
      />
    </Switch>
  </>
);

export default MainRouter;
