import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser, clearErrors } from '../../util/session_api_util';
import SessionForm from './session_form';

const mapStateToProps = ({ session, errors }) => {
  return {
    errors: Object.values(errors),
    formType: 'Login',
    navLink: <Link to="/signup" className="session-switch">Need an account? Sign-up instead</Link>,
    message: "Access your account",
    session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);