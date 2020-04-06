import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import {
  closeAuthModal as closeAuthModalAction,
} from '../redux/auth-modal/actions';

Modal.setAppElement(document.getElementById('root'));

const AuthModal = ({ isOpen, closeAuthModal }) => {
  const [registerIsOpen, setRegisterIsOpen] = React.useState(true);

  const stopPropagation = (event) => event.stopPropagation();
  const handleDisplayLoginForm = () => setRegisterIsOpen(false);
  const handleDisplayRegisterForm = () => setRegisterIsOpen(true);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={closeAuthModal}
      onKeyUp={(event) => event.key.toLowerCase() === 'escape' && closeAuthModal()}
      className={`modal fade show bg-black-transparent ${isOpen ? 'd-block' : ''}`}
    >
      <div
        role="button"
        tabIndex={0}
        onKeyUp={() => null}
        onClick={stopPropagation}
        className="modal-dialog modal-dialog-centered custom-modal-form"
      >
        <div className="modal-content bg-black custom-rounded-2rem">
          <div className="bg-white custom-rounded-2rem h-100 custom-clip-path-circle">
            <div className="align-items-center border-bottom-0 justify-content-center modal-header">
              <div id="headingOne">
                <button
                  type="button"
                  onClick={handleDisplayLoginForm}
                  className="btn text-grey-to-black"
                >
                  <span className="h1 mb-0">Login</span>
                </button>
              </div>
              <span className="border-darks border-right mx-sm-4 py-4" />
              <div id="headingTwo">
                <button
                  type="button"
                  className="btn text-grey-to-black"
                  onClick={handleDisplayRegisterForm}
                >
                  <span className="h1 mb-0">Register</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              {
                registerIsOpen
                  ? <RegisterForm />
                  : <LoginForm />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthModal.defaultProps = {
  isOpen: false,
  closeAuthModal: null,
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  closeAuthModal: PropTypes.func,
};

const mapStateToProps = ({ authModal }) => ({
  isOpen: authModal.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeAuthModal: () => dispatch(closeAuthModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
