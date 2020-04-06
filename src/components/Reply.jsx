import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

const Reply = ({ reply }) => (
  <div className="align-items-baseline ml-2 ml-md-0 mt-md-4 mx-xl-3 row">
    <div>
      <Image
        circle
        src={reply.user.imageUrl}
        alt="User things goes here"
      />
    </div>
    <div className="pl-3">
      <div className="text-black-50">
        <span className="h3 mb-0">
          {reply.user.name}
        </span>
      </div>
      <div className="d-flex h4 justify-content-between mb-0 pl-2 pl-md-0 text-body">
        <span>
          {reply.text}
        </span>
      </div>
    </div>
  </div>
);

Reply.defaultProps = {
  reply: {},
};

Reply.propTypes = {
  reply: PropTypes.instanceOf(Object),
};

export default Reply;
