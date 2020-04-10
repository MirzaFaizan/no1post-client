import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { addReply } from '../redux/posts/actions';

const CreateReply = ({
  isOpen,
  postId,
  commentId,
  createReply,
}) => {
  const ref = React.useRef(null);

  const [reply, setReply] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && !isLoading) {
      ref.current.focus();
    }
  }, [isOpen]);

  const onSubmit = (event) => {
    if (event.key.toUpperCase() === 'ENTER') {
      setIsLoading(true);

      createReply(postId, commentId, reply, () => {
        setReply('');
        setIsLoading(false);
      });
    }
  };

  const onChange = (event) => {
    const { target: { value } } = event;

    setReply(value);
  };

  return (
    <div className={`input-group mt-3 ${isOpen ? 'd-block py-2' : 'd-none'}`}>
      {
        isLoading
          ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )
          : (
            <input
              ref={ref}
              type="text"
              name="reply"
              value={reply}
              onChange={onChange}
              onKeyDown={onSubmit}
              placeholder="Write Something..."
              className="border-left-0 border-right-0 border-top-0 form-control"
            />
          )
      }
    </div>
  );
};

CreateReply.defaultProps = {
  postId: '',
  commentId: '',
  isOpen: false,
  createReply: null,
};

CreateReply.propTypes = {
  isOpen: PropTypes.bool,
  postId: PropTypes.string,
  commentId: PropTypes.string,
  createReply: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createReply: (postId, commentId, reply, callback) => {
    dispatch(addReply(postId, commentId, reply, callback));
  },
});

export default connect(null, mapDispatchToProps)(CreateReply);
