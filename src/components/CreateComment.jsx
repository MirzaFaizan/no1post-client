import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../redux/posts/actions';

const CreateComment = ({ createComment, postId }) => {
  const [comment, setComment] = React.useState('');

  const onSubmit = (event) => {
    const { key } = event;

    if (key.toUpperCase() === 'ENTER') {
      createComment(postId, comment);
      setComment('');
    }
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="input-group mt-3">
      <input
        type="text"
        name="comment"
        placeholder="Write Something..."
        className="border-left-0 border-right-0 border-top-0 form-control"
        value={comment}
        onChange={onChange}
        onKeyDown={onSubmit}
        autoComplete="off"
      />
    </div>
  );
};

CreateComment.defaultProps = {
  postId: '',
  createComment: null,
};

CreateComment.propTypes = {
  postId: PropTypes.string,
  createComment: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createComment: (postId, comment) => {
    dispatch(addComment(postId, comment));
  },
});

export default connect(null, mapDispatchToProps)(CreateComment);
