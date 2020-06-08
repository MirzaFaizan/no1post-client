import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { filteredPostSelector } from "../redux/posts/selectors";

import Post from "./Post";

const Posts = ({ posts }) => (
  <>
    {posts.map((post) => (
      <Post post={post} key={post._id} />
    ))}
  </>
);

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: PropTypes.instanceOf(Array),
};

const mapStateToProps = (state) => ({
  posts: filteredPostSelector(state),
});

export default connect(mapStateToProps, null)(Posts);
