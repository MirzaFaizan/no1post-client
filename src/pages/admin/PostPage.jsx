import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Button,
} from 'react-bootstrap';

import AddPostModal from '../../components/AddPostModal';

const PostPage = ({ posts }) => {
  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const onAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const onAddModalClose = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      <h2 className="mb-5">
        Post Page
      </h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={onAddModalOpen}>
          Add Post
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Posted By</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.postBy.name}</td>
                <td>{post.description}</td>
                <td>{post.category.category}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AddPostModal
        isOpen={addModalOpen}
        onClose={onAddModalClose}
      />
    </div>
  );
};

PostPage.defaultProps = {
  posts: [],
};

PostPage.propTypes = {
  posts: PropTypes.instanceOf(Array),
};

const mapStateToProps = ({ posts }) => ({
  posts,
});

// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(PostPage);
