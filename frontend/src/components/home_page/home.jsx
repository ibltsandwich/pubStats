import React from 'react';
import { connect } from 'react-redux';

import Footer from '../footer/footer';
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
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const playerName = this.state.playerName;
    if (playerName.length === 0) {
      this.setState({ empty: true })
    } else {
      this.props.history.push(`/players/${playerName}`);
    }
  }

  render() {
    return(
      <div className="home-container">
        <h1 className="splash-logo">pubStats</h1>
        <form className="home-player-search" onSubmit={this.handleSubmit} autoCorrect="off" autoCapitalize="none">
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
          {this.state.empty ? 
            <h1 className="empty-field-error">* Please enter a valid player name</h1>
            :
            null
          }
        </form>
        <Footer />
      </div>
    )
  }
}

export default connect(msp, mdp)(Home);