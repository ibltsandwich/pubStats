import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <section>
          <h1 className="logo">pubStats</h1>
        </section>
        <ul className="session-buttons">
          <li><Link>Log In</Link></li>
          <li><Link>Sign Up</Link></li>
        </ul>
      </header>
    )
  }
}

export default connect(msp, mdp)(Header);