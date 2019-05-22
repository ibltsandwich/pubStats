import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser, clearErrors } from '../../util/session_api_util';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: Object.values(errors),
    formType: 'Login',
    navLink: <Link to="/signup">Need an account? Sign-up instead</Link>,
    message: "Welcome back!"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);