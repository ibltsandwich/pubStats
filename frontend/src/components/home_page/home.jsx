import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer } from '../../actions/player_actions';

const msp = state => {
  return {};
};

const mdp = dispatch => {
  return {
    fetchPlayer: playerName => dispatch(fetchPlayer(playerName))
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playerName: ''}

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const playerName = this.state.playerName;
    // this.props.fetchPlayer(playerName)
      // .then(
        this.props.history.push(`/players/${playerName}`)
        // );
  }

  render() {
    return(
      <>
        <h1 className="splash-logo">pubStats</h1>
        <form className="home-player-search" onSubmit={this.handleSubmit}>
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