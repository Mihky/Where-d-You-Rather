import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaYelp from 'react-icons/lib/fa/yelp';

export class Header extends Component {
  goHome() {
    this.props.history.push({
      pathname: '/',
    })
  }

  render() {
    return (
      <div className="App-header">
        <div className="flex-container flex-vertically-center">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }} className="App-title clickable">{"Where'd You Rather"}</Link>
          <FaYelp className="App-logo yelp-theme-foreground" alt="logo" size={35} />
        </div>
      </div>
    );
  }
}

export default Header;
