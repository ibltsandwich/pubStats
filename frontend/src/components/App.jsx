import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './home_page/home';
import Header from './header/header';
import Footer from './footer/footer';
import LogInForm from './session/login_form_container';
import SignUpForm from './session/signup_form_container';
import PlayerMatchHistory from './player/player_match_history';

import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
        <Route path="/players/:playerName" component={PlayerMatchHistory} />
        <Footer />
      </div>
    );
  }
}

export default App;
