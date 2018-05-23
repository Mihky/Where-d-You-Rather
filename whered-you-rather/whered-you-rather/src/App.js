import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/searchbox.js';
import CardDuel from './components/duel.js';
import Winner from './components/winner.js';
import FaYelp from 'react-icons/lib/fa/yelp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: null,
      businessIterator: null,
      isPlaying: false,
      leftCard: {
        done: false,
        businessIndex: null,
        value: this.initCard(),
      },
      rightCard: {
        done: false,
        businessIndex: null,
        value: this.initCard(),
      },
    };
  }

  makeIterator(array) {
    var nextIndex = 0;

    return {
      next: function() {
        return nextIndex < array.length ?
          {
            done: false,
            businessIndex: nextIndex,
            value: array[nextIndex++],
          } : {
            done: true,
          };
      },

      previous: function() {
        if (nextIndex > 0) {
          nextIndex -= 1;
        }
        return {
          done: false,
          businessIndex: nextIndex,
          value: array[nextIndex],
        };
      }
    };
  }

  initCard() {
    return {
      address: "",
      categories: [],
      distance: 0,
      imageUrl: "",
      index: 0,
      name: "",
      phone: "",
      price: "",
      rating: "",
      reviewCount: "",
      yelpUrl: "",
    }
  }

  makeCard(businessIndex, businessData) {
    var categories = [];
    for (var index = 0; index < businessData.categories.length; index++) {
      categories.push(businessData.categories[index]['title']);
    }
    return {
      address: businessData.location['display_address'],
      categories: categories,
      distance: businessData.distance,
      imageUrl: businessData.image_url,
      index: businessIndex,
      name: businessData.name,
      phone: businessData.display_phone,
      price: businessData.price,
      rating: businessData.rating,
      reviewCount: businessData.review_count,
      yelpUrl: businessData.url,
    }
  }

  canPlay(businesses) {
    return businesses.length >= 5;
  }

  isGameOver() {
    if (this.state.leftCard.done || this.state.rightCard.done) {
      return true;
    }
    return false;
  }

  init(businesses) {
    var businessIterator = this.makeIterator(businesses);
    var firstCard = businessIterator.next();
    var secondCard = businessIterator.next();

    this.setState({
      businessIterator: businessIterator,
      isPlaying: true,
      leftCard: {
        done: firstCard.done,
        businessIndex: firstCard.businessIndex,
        value: this.makeCard(firstCard.businessIndex, firstCard.value),
      },
      rightCard: {
        done: secondCard.done,
        businessIndex: secondCard.businessIndex,
        value: this.makeCard(secondCard.businessIndex, secondCard.value),
      },
    });
  }

  queryYelpForBusinesses(isValidAddress, longitude, latitude) {
    if (!isValidAddress) {
      // TODO: Show toast
      toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      var route = 'https://whered-you-rather.appspot.com/queryYelpAPI';
      alert(route);
      axios.get(route, {
        params: {
          longitude: longitude,
          latitude: latitude,
        }
      })
        .then((response) => {
          console.log(response);
          var businesses = response.data['businesses'];
          if (this.canPlay(businesses)) {
            businesses = businesses.slice(0, 10);
            this.init(businesses);
            // TODO: route game
            // this.props.history.push('/play');
          } else {
            // TODO: Error Toast saying not enough businesses around that location
          }
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  handleCardClick(index) {
    var nextBusiness = this.state.businessIterator.next();

    if (nextBusiness.done) {
      // route to winner page
      alert('ROUTE TO DONE PAGE BRO');
      this.props.history.push({
        pathname: '/winner',
        state: {cardData: index === 0 ? this.state.leftCard.value : this.state.rightCard.value},
      })
      return;
    }

    // Keep the Right Card and replace the left card with a new choice
    if (index === 1) {
      this.setState({
        leftCard: {
          done: nextBusiness.done,
          businessIndex: nextBusiness.businessIndex,
          value: this.makeCard(nextBusiness.businessIndex, nextBusiness.value)},
      });
    // Keep the Left Card and replace the right card with a new choice
    } else if (index === 0) {
      this.setState({
        rightCard: {
          done: nextBusiness.done,
          businessIndex: nextBusiness.businessIndex,
          value: this.makeCard(nextBusiness.businessIndex, nextBusiness.value)},
      });
    }
  }

  render() {
    var props = {};

    if (this.state.isPlaying) {
      var leftCard = this.state.leftCard.value;
      var rightCard = this.state.rightCard.value;
      console.log(leftCard);
      props = {
        leftAddress: leftCard.address,
        rightAddress: rightCard.address,
        leftCategories: leftCard.categories,
        rightCategories: rightCard.categories,
        leftDistance: leftCard.distance,
        rightDistance: rightCard.distance,
        leftImageUrl: leftCard.imageUrl,
        rightImageUrl: rightCard.imageUrl,
        leftName: leftCard.name,
        rightName: rightCard.name,
        leftPhone: leftCard.phone,
        rightPhone: rightCard.phone,
        leftPrice: leftCard.price,
        rightPrice: rightCard.price,
        leftRating: leftCard.rating,
        rightRating: rightCard.rating,
        leftReviewCount: leftCard.reviewCount,
        rightReviewCount: rightCard.reviewCount,
        leftYelpUrl: leftCard.yelpUrl,
        rightYelpUrl: rightCard.yelpUrl,
      };
    } else {
      props = {
        leftAddress: "13425 Washington Blvd Marina Del Rey, CA 90292",
        leftCategories: ["Burgers", "Fast Food"],
        leftDistance: 1000,
        leftImageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/ZtZKp_ViQOom6hC399UVNA/348s.jpg",
        leftName: "In-N-Out Burger",
        leftPhone: "(800) 786-1000",
        leftRating: "4",
        leftPrice:"$",
        leftReviewCount:"520",
        leftYelpUrl: "https://www.yelp.com/biz/in-n-out-burger-marina-del-rey",
        rightAddress: "525 Broadway Santa Monica, CA 90401",
        rightCategories: ["Burgers", "American (New)", "Gastropubs"],
        rightDistance: 400,
        rightImageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/sJ63GtJo85ipWj5vVPn7EA/348s.jpg",
        rightName: "Umami Burger - Santa Monica",
        rightPhone: "(310) 451-1300",
        rightPrice: "$$",
        rightRating: "4",
        rightReviewCount: "2354",
        rightYelpUrl: "https://www.yelp.com/biz/umami-burger-santa-monica-santa-monica",
      };
    }
    var winnerProps = {
      address: "13425 Washington Blvd Marina Del Rey, CA 90292",
      categories: ["Burgers", "Fast Food"],
      distance: 1000,
      imageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/ZtZKp_ViQOom6hC399UVNA/348s.jpg",
      name: "In-N-Out Burger",
      phone: "(800) 786-1000",
      rating: "4",
      price:"$",
      reviewCount:"520",
      yelpUrl: "https://www.yelp.com/biz/in-n-out-burger-marina-del-rey",
    };
    return (
      <div className="App">
        <header className="App-header flex-container flex-horizontally-center flex-vertically-center">
          <h1 className="App-title">{"Where'd You Rather"}</h1>
          <FaYelp className="App-logo yelp-theme-foreground" alt="logo" size={70} />
        </header>
        <SearchComponent onClick={(valid, lon, lat) => this.queryYelpForBusinesses(valid, lon, lat)}></SearchComponent>
        <CardDuel {...props} onClick={(index) => this.handleCardClick(index)}/>
      </div>
    );
  }
}

export default App;
