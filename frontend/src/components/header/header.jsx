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
        <Link to="/" className="home-link">
          <section>
            <h1 className="logo">pubStats</h1>
          </section>
        </Link>
        <ul className="session-buttons">
          <Link to="/login"><li>Log In</li></Link>
          <Link to="/signup"><li>Sign Up</li></Link>
        </ul>
      </header>
    )
  }
}

export default connect(msp, mdp)(Header);