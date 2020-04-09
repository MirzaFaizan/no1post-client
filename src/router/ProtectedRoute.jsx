import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  exact,
  isLoading,
  isAuthenticated,
  path,
}) => {
  if (isLoading) {
    return (
      <div className="h-100 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      component={Component}
    />
  );
};

ProtectedRoute.defaultProps = {
  component: null,
  exact: false,
  isAuthenticated: false,
  isLoading: true,
  path: '',
};

ProtectedRoute.propTypes = {
  /* eslint-disable-next-line */
  component: PropTypes.any,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoading: state.admin.isLoading,
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
