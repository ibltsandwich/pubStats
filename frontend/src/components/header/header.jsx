import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../util/session_api_util';

const msp = state => {
  const currentUser = state.session;

  return {
    currentUser
  };
}

const mdp = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.userDropdown.style.display = 'block';
  }

  handleMouseLeave() {
    this.userDropdown.style.display = 'none';
  }

  render() {
    return (
      <header className="site-header">
        <Link to="/" className="home-link">
          <section>
            <h1 className="logo">pubStats</h1>
          </section>
        </Link>
        {this.props.currentUser.id ? 
          <main className="site-header-current-user" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <h1>{this.props.currentUser.username}</h1>
            <ul className="user-dropdown" ref={elem => this.userDropdown = elem}>
              User account stuff will go here
              <li onClick={this.props.logoutUser}>Logout</li>
            </ul>
          </main> 
          :
          <ul className="session-buttons">
            <Link to="/login"><li>Log In</li></Link>
            <Link to="/signup"><li>Sign Up</li></Link>
          </ul> 
        }
      </header>
    )
  }
}

export default connect(msp, mdp)(Header);