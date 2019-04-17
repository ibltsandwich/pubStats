import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return {};
}

const mdp = dispatch => {
  return {};
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="site-header">
        <h1 className="logo">pubStats</h1>
        <ul className="session-buttons">
          <li>Log In</li>
          <li>Sign Up</li>
        </ul>
      </header>
    )
  }
}

export default connect(msp, mdp)(Header);