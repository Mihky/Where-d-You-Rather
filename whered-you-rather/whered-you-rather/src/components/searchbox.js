import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import FaMapMarker from 'react-icons/lib/fa/map-marker';

export class SearchComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      address: '',
      isValidAddress: false,
      latitude: null,
      longitude: null,
    }
  }

  handleChange = (address) => {
    this.setState(
      {address: address}
    );
  }

  handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isValidAddress: true,
        });
      })
      .catch(error => {
        this.setState({ isValidAddress: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  }

  handleClick() {
    // invalid address
    if (!this.state.isValidAddress) {
      // show invalid message to user
      alert('nah');
    } else {
      // return up the lat lon
      alert('yah');
      this.props.handleClick();
      // var search_endpoint = "https://api.yelp.com/v3/businesses/search?term=food&latitude=" + this.state.longitude + "&longitude=" + this.state.latitude + "open_now=true"
      // alert(search_endpoint);
      // var headers = {
      //   'Authorization': 'Bearer YoRkXeDyFwsJA-DuzH0BOktWgYH6HoTPhiH33brhV646wQlxsm94BnbuILxWPrKe3gOKKvS7blGh0-sUN8-pbyCQVplCvsoSYfoRJD1AvfEfcjUFYJUFxxcfFQjgWnYx',
      // }
      // axios.get('/query_yelp_api')
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
  }

  render() {
    return (
      <div id="searchBar" className="flex-container flex-horizontally-center">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Enter Location',
                  className: 'location-search-input text-style remove-border'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button className="button yelp-theme remove-border" onClick={() => this.props.onClick(this.state.isValidAddress, this.state.longitude, this.state.latitude)}>
          <FaMapMarker size={35} />
        </button>
      </div>
    );
  }
}

export default SearchComponent;
