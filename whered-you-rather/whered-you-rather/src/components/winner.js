import React, { Component } from 'react';
import Card from './card.js';
import ConfettiCanvas from 'react-confetti-canvas';
import Header from './header.js';

export class Winner extends Component {
  render() {
    const { cardData } = this.props.location.state;
    const config = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      decay: 0.9
    };

    return (
      <div className="page-container">
        <Header />
        <div className="winner-container">
          <h1>Winner</h1>
          <Card onClick={() => this.props.onClick(0)}
            address={cardData.address}
            categories={cardData.categories}
            distance={cardData.distance}
            image_url={cardData.imageUrl}
            name={cardData.name}
            phone_number={cardData.phone}
            price={cardData.price}
            rating={cardData.rating}
            review_count={cardData.reviewCount}
            yelp_url={cardData.yelpUrl}
          />
        </div>
      </div>
    );
  }
}

export default Winner;
