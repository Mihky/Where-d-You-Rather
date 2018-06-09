import React, { Component } from 'react';
import Card from './card.js';
import Header from './header.js';

export class Winner extends Component {
  componentWillMount() {
    if (this.props.history.action === 'POP') {
      this.props.history.push('/');
    }
  }

  render() {
    const { cardData } = this.props.location.state;

    return (
      <div className="page-container">
        <Header />
        <div className="content-container winner-container">
          <h1>Winner</h1>
          <Card className="non-clickable"
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
