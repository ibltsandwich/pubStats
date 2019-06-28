import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './home_page/home';
import Header from './header/header';
import Footer from './footer/footer';
import LogInForm from './session/login_form_container';
import SignUpForm from './session/signup_form_container';
import PlayerStats from './player/player_stats';

import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
        <Route path="/players/:playerName" component={PlayerStats} />
        <Footer />
      </div>
    );
  }
}

export default App;
