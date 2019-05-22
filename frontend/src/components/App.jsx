import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './home_page/home';
import Header from './header/header';
import LogInForm from './session/login_form_container';
import SignUpForm from './session/signup_form_container';

import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
      </div>
    );
  }
}

export default App;
