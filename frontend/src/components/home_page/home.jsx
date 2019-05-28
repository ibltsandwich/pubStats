import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return {};
};

const mdp = dispatch => {
  return {};
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playerName: ''}
  };

  update(field) {
    // if (this.sessionSubmit) {
    //   if (this.props.formType === 'Login') {
    //     if (this.state.username.length > 0 && this.state.password.length > 0) {
    //       this.sessionSubmit.disabled = false;
    //     } else {
    //       this.sessionSubmit.disabled = true;
    //     }
    //   } else if (this.props.formType === 'Register') {
    //     if (this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password2.length > 0) {
    //       this.sessionSubmit.disabled = false;
    //     } else {
    //       this.sessionSubmit.disabled = true;
    //     }
    //   }
    // };

    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return(
      <>
        <h1 className="splash-logo">pubStats</h1>
        <form className="home-player-search">
          <div>
            <label htmlFor="player-search-input">Player Search</label>
            <input 
              type="text" 
              id="player-search-input"
              placeholder="Enter PUBG username here"
              className="player-search-input" 
              value={this.state.playerName}
              onChange={this.update('playerName')}
            />
            <label htmlFor="player-search-submit">Submit Player Search</label>
            <button 
              type="submit" 
              id="player-search-submit" 
              className="player-search-submit">
              SEARCH
            </button>
          </div>
        </form>
      </>
    )
  }
}

export default connect(msp, mdp)(Home);