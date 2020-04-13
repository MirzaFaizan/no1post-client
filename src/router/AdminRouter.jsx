import React from 'react';
import { Switch } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';

import CategoryPage from '../pages/admin/CategoryPage';
import PostPage from '../pages/admin/PostPage';
import UsersPage from '../pages/admin/UsersPage';

import ProtectedRoute from './ProtectedRoute';

const AdminRouter = () => (
  <AdminLayout>
    <Switch>
      <ProtectedRoute
        exact
        path="/admin"
        component={PostPage}
      />
      <ProtectedRoute
        exact
        path="/admin/categories"
        component={CategoryPage}
      />
      <ProtectedRoute
        exact
        path="/admin/users"
        component={UsersPage}
      />
    </Switch>
  </AdminLayout>
);

export default AdminRouter;
