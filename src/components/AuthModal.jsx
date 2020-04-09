import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import {
  changeView,
  closeAuthModal as closeAuthModalAction,
} from '../redux/auth-modal/actions';

Modal.setAppElement(document.getElementById('root'));

const AuthModal = ({
  view,
  isOpen,
  closeAuthModal,
  openLoginScreen,
  openRegisterScreen,
}) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

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
                  onClick={openLoginScreen}
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
                  onClick={openRegisterScreen}
                >
                  <span className="h1 mb-0">Register</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              {
                view === 'register'
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
  view: '',
  isOpen: false,
  closeAuthModal: null,
  openLoginScreen: null,
  openRegisterScreen: null,
};

AuthModal.propTypes = {
  view: PropTypes.string,
  isOpen: PropTypes.bool,
  closeAuthModal: PropTypes.func,
  openLoginScreen: PropTypes.func,
  openRegisterScreen: PropTypes.func,
};

const mapStateToProps = ({ authModal }) => ({
  view: authModal.view,
  isOpen: authModal.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeAuthModal: () => dispatch(closeAuthModalAction()),
  openLoginScreen: () => dispatch(changeView('login')),
  openRegisterScreen: () => dispatch(changeView('register')),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
