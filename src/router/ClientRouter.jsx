import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import ClientLayout from '../layouts/ClientLayout';

import HomePage from '../pages/HomePage';

const ClientRouter = () => (
  <ClientLayout>
    <Switch>
      <Route
        exact
        path="/"
        component={HomePage}
      />
    </Switch>
  </ClientLayout>
);

export default ClientRouter;
