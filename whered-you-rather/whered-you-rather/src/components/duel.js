import React, { Component } from 'react';
import Card from './card.js';
import Header from './header.js';

export class CardDuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isPlaying: false,
      leftCard: null,
      rightCard: null,
    }
  }

  componentWillMount() {
    const { businesses } = this.props.location.state;
    this.init(businesses);
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
    console.log(this.state);
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

  handleCardClick(index) {
    var nextBusiness = this.state.businessIterator.next();

    if (nextBusiness.done) {
      // route to winner page
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
    var leftCard = this.state.leftCard.value;
    var rightCard = this.state.rightCard.value;

    return (
      <div className="page-container">
        <Header />
        <div className="content-container card-container">
          <Card onClick={() => this.handleCardClick(0)}
            address={leftCard.address}
            categories={leftCard.categories}
            distance={leftCard.distance}
            image_url={leftCard.imageUrl}
            name={leftCard.name}
            phone_number={leftCard.phone}
            price={leftCard.price}
            rating={leftCard.rating}
            review_count={leftCard.reviewCount}
            yelp_url={leftCard.yelpUrl}
          />
          <Card onClick={() => this.handleCardClick(1)}
            address={rightCard.address}
            categories={rightCard.categories}
            distance={rightCard.distance}
            image_url={rightCard.imageUrl}
            name={rightCard.name}
            phone_number={rightCard.phone}
            price={rightCard.price}
            rating={rightCard.rating}
            review_count={rightCard.reviewCount}
            yelp_url={rightCard.yelpUrl}
          />
        </div>
      </div>
    );
  }
}

export default CardDuel;
