import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

import * as APIUtil from './util/session_api_util';

import configureStore from './store/store';
import Root from './root';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();

  if (localStorage.jwtToken) {
    APIUtil.setAuthToken(localStoage.jwtToken);

    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(APIUtil.setCurrentUser(decoded));

    const currentTime = Date.now() / 10000;
    if (decoded.exp < currentTime) {
      store.dispatch(APIUtil.logoutUser());
      window.location.href = '/login';
    }
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
// ReactDOM.render(<App />, document.getElementById('root'));