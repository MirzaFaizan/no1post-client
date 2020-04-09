import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import CreateComment from './CreateComment';

const Comments = ({ comments, isOpen, postId }) => (
  <div className={`mt-n4 custom-opacity ${isOpen ? '' : 'd-none'}`}>
    <div className="border-top-0 card card-body pt-5 px-2 px-md-5 custom-rounded-1rem">
      {comments.map((comment) => (
        <Comment
          key={comment.text}
          postId={postId}
          comment={comment}
        />
      ))}
      <CreateComment
        postId={postId}
      />
    </div>
  </div>
);

Comments.defaultProps = {
  postId: '',
  comments: [],
  isOpen: false,
};

Comments.propTypes = {
  isOpen: PropTypes.bool,
  postId: PropTypes.string,
  comments: PropTypes.instanceOf(Array),
};

export default Comments;
