import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {

  return (
    <div className="footer-container">
      <footer>
        <a href="http://www.brian-lee.me" target="_blank"><i className="fas fa-folder"></i></a>
        <a href="https://github.com/ibltsandwich/pubStats" target="_blank"><i className="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/brian-lee2" target="_blank"><i className="fab fa-linkedin"></i></a>
      </footer>
      <h5>Created by Brian Lee</h5>
    </div>
  )
}

export default Footer;