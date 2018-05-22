import React, { Component } from 'react';
import Card from './card.js';
import Confetti from 'react-dom-confetti';

export class Winner extends Component {
  render() {
    const config = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      decay: 0.9
    };
    return (
      <div className="winner-container">
        <Confetti active={true} config={config} />
        <h1>Winner</h1>
        <Card onClick={() => this.props.onClick(0)}
          address={this.props.address}
          categories={this.props.categories}
          distance={this.props.distance}
          image_url={this.props.imageUrl}
          name={this.props.name}
          phone_number={this.props.phone}
          price={this.props.price}
          rating={this.props.rating}
          review_count={this.props.reviewCount}
          yelp_url={this.props.yelpUrl}
        />
      </div>
    );
  }
}

export default Winner;
