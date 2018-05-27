import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/searchbox.js';
import CardDuel from './components/duel.js';
import Winner from './components/winner.js';
import Header from './components/header.js';
import FaYelp from 'react-icons/lib/fa/yelp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
  }

  canPlay(businesses) {
    return businesses.length >= 5;
  }

  queryYelpForBusinesses(isValidAddress, longitude, latitude) {
    if (!isValidAddress) {
      // TODO: Show toast
      toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      var route = 'https://whered-you-rather.appspot.com/queryYelpAPI';
      axios.get(route, {
        params: {
          longitude: longitude,
          latitude: latitude,
        }
      })
        .then((response) => {
          var businesses = response.data['businesses'];
          if (this.canPlay(businesses)) {
            businesses = businesses.slice(0, 10);
            this.props.history.push({
              pathname: '/play',
              state: {businesses: businesses},
            })
          } else {
            // TODO: Error Toast saying not enough businesses around that location
          }
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  render() {
    return (
      <div className="App flex-vertically-center">
        <div className="flex-container flex-horizontally-center">
          <div className="App-home">{"Where'd You Rather"}</div>
          <FaYelp className="App-logo yelp-theme-foreground" alt="logo" size={70} />
        </div>
        <SearchComponent onClick={(valid, lon, lat) => this.queryYelpForBusinesses(valid, lon, lat)}></SearchComponent>
      </div>
    );
  }
}

export default App;
