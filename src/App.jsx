import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';
import MainRouter from './router';

import { initPosts } from './redux/posts/actions';

const App = ({ loadPosts }) => {
  React.useEffect(() => {
    loadPosts();
  });

  return (
    <MainRouter />
  );
};

App.defaultProps = {
  loadPosts: null,
};

App.propTypes = {
  loadPosts: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(initPosts()),
});

export default connect(null, mapDispatchToProps)(App);
