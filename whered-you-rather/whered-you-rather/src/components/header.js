import React, { Component } from 'react';
import FaYelp from 'react-icons/lib/fa/yelp';

export class Header extends Component {
  render() {
    return (
      <div className="App-header flex-container flex-vertically-center">
        <div className="App-title">{"Where'd You Rather"}</div>
        <FaYelp className="App-logo yelp-theme-foreground" alt="logo" size={35} />
      </div>
    );
  }
}

export default Header;
