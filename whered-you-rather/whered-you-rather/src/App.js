import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/searchbox.js';
import FaYelp from 'react-icons/lib/fa/yelp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

class App extends Component {
  canPlay(businesses) {
    return businesses.length >= 5;
  }

  queryYelpForBusinesses(isValidAddress, longitude, latitude) {
    if (!isValidAddress) {
      notify.show("Address Not Valid", "error", 1000);
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
            var randomizedBusinesses = getRandomList(businesses)
            this.props.history.push({
              pathname: '/play',
              state: {businesses: randomizedBusinesses},
            })
          } else {
            notify.show("Not Enough Businesses Found", "error", 1000);
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
        <Notifications />
        <div className="flex-container flex-horizontally-center">
          <div className="App-home">{"Where'd You Rather"}</div>
          <FaYelp className="App-logo yelp-theme-foreground" alt="logo" size={70} />
        </div>
        <SearchComponent onClick={(valid, lon, lat) => this.queryYelpForBusinesses(valid, lon, lat)}></SearchComponent>
      </div>
    );
  }
}

function getRandomList(items) {
  var newItems = [];
  var iters = 0;
  if (items.length < 10) {
    iters = items.length;
  } else {
    iters = 10;
  }

  for(var i = 0; i < iters; i++) {
      var idx = Math.floor(Math.random() * items.length);
      newItems.push(items[idx]);
      items.splice(idx, 1);
  }

  return newItems;
}

export default App;
