import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './home_page/home';
import Header from './header/header';
import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <h1>pubStats</h1>
        </header>
        <Route exact path="/" component={Home}/>
      </div>
    );
  }
}

export default App;
