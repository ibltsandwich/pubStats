import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './home_page/home';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1>pubStats</h1>
        </header> */}
        <Route path="/" component={Home}/>
      </div>
    );
  }
}

export default App;
