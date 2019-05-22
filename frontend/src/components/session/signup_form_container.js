import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser, clearErrors } from '../../util/session_api_util';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: Object.values(errors),
    formType: 'Register',
    navLink: <Link to="/login">Already have an account? Log-in instead</Link>,
    message: "Create an account"
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    processForm: (user) => dispatch(registerUser(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);