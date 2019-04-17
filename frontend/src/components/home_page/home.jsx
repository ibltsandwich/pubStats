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
  };

  render() {
    return(
      <h1>Home Page for pubStats</h1>
    )
  }
}

export default connect(msp, mdp)(Home);