import React, { Component } from 'react';
import FaStar from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStarHalfEmpty from 'react-icons/lib/fa/star-half-empty';
import FaPhone from 'react-icons/lib/fa/phone';
import FaDollar from 'react-icons/lib/fa/dollar';
import FaMapPin from 'react-icons/lib/fa/map-pin';
import FaRoad from 'react-icons/lib/fa/road';
import FaCutlery from 'react-icons/lib/fa/cutlery';
import FaYelp from 'react-icons/lib/fa/yelp';

export class Card extends Component {
  convertDistance(distance) {
    return (Number(distance) / 1609.34).toFixed(2);
  }

  priceRange(price) {
    if (!price) {
      return '';
    }
    if (price.length === 1) {
      return "Under $10";
    } else if (price.length === 2) {
      return "$11-30";
    } else if (price.length === 3) {
      return "$31-60";
    } else {
      return "Above $61";
    }
  }

  disableNormalClickBehavior(e) {
    e.stopPropagation();
  }

  render() {
    const ICON_SIZE = 25;

    return (
        <div className="card" onClick={this.props.onClick}>
          <img className="card-image" src={this.props.image_url} alt="Business Thumbnail" />
          <h1 className="text-margin">{this.props.name}</h1>

          <div className="flex-container flex-vertically-center">
            <div className="stars-container text-margin">
              <Rating rating={this.props.rating} />
            </div>
            <div className="text-margin">
              {this.props.review_count} reviews
            </div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <PriceRange price={this.props.price} />
            <div className="text-margin">{this.priceRange(this.props.price)}</div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <FaPhone size={ICON_SIZE} />
            <div className="text-margin">{this.props.phone_number}</div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <FaMapPin size={ICON_SIZE} />
            <div className="text-margin">{this.props.address.join(", ")}</div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <FaRoad size={ICON_SIZE} />
            <div className="text-margin">{this.convertDistance(this.props.distance)} miles away</div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <FaCutlery size={ICON_SIZE} />
            <div className="text-margin">{this.props.categories.join(", ")}</div>
          </div>

          <div className="flex-container flex-vertically-center text-margin">
            <FaYelp size={ICON_SIZE} />
            <div className="text-margin" onClick={this.disableNormalClickBehavior}><a style={{display: "table-cell"}} href={this.props.yelp_url} target="_blank">Find On Yelp</a></div>
          </div>
        </div>
    );
  }
}

function Rating(props) {
  if (!props.rating) {
    return null;
  }

  var rating = Number(props.rating);
  var stars = [];
  const STAR_SIZE = 30;

  for (var index = 0; index < 5; index++) {
    if (rating === 0) {
      stars.push(
        <FaStarO key={index} size={STAR_SIZE} className="yelp-theme-foreground" />
      );
    } else if (rating >= 1) {
      rating -= 1;
      stars.push(
        <FaStar key={index} size={STAR_SIZE} className="yelp-theme-foreground" />
      );
    } else {
      rating = Math.floor(rating);
      stars.push(
        <FaStarHalfEmpty key={index} size={STAR_SIZE} className="yelp-theme-foreground" />
      );
    }
  }
  return stars;
}

function PriceRange(props) {
  if (!props.price) {
    return null;
  }

  var price = props.price;
  var dollarSigns = [];
  const DOLLAR_SIZE = 25;

  for (var index = 0; index < 4; index++) {
    if (index < price.length) {
      dollarSigns.push(
        <FaDollar key={index} size={DOLLAR_SIZE} color="green" />
      );
    } else {
      dollarSigns.push(
        <FaDollar key={index} size={DOLLAR_SIZE} color="grey" />
      );
    }
  }

  return dollarSigns;
}

export default Card;
