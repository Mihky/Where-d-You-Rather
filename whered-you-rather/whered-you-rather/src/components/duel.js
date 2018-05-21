import React, { Component } from 'react';
import Card from './card.js';

export class CardDuel extends Component {
  render() {
    const {
      hidePriceFulfillmentDisplay,
      primaryOffer,
      productType,
      productPageUrl,
      inventory,
      submapType,
      ppu,
      isLoggedIn,
      gridView
    } = this.props;

    return (
      <div className="card-container">
        <Card onClick={() => this.props.onClick(0)}
          address={this.props.leftAddress}
          categories={this.props.leftCategories}
          distance={this.props.leftDistance}
          image_url={this.props.leftImageUrl}
          name={this.props.leftName}
          phone_number={this.props.leftPhone}
          price={this.props.leftPrice}
          rating={this.props.leftRating}
          review_count={this.props.leftReviewCount}
          yelp_url={this.props.leftYelpUrl}
        />
        <Card onClick={() => this.props.onClick(1)}
          address={this.props.rightAddress}
          categories={this.props.rightCategories}
          distance={this.props.rightDistance}
          image_url={this.props.rightImageUrl}
          name={this.props.rightName}
          phone_number={this.props.rightPhone}
          price={this.props.rightPrice}
          rating={this.props.rightRating}
          review_count={this.props.rightReviewCount}
          yelp_url={this.props.rightYelpUrl}
        />
      </div>
    );
  }
}

export default CardDuel;
