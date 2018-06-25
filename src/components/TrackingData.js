import React, { Component } from 'react';

import '../assets/TrackingData.css';
import '../assets/Data.css';

class TrackingData extends Component {
  render() {
    return (
      <div className='trackingData'>
        <h1>TRACKING</h1>
        Latitude:
        <span className='data'> {this.props.lat.toFixed(3)}°</span>
        <br />
        Longitude:
        <span className='data'> {this.props.lon.toFixed(3)}°</span>
        <br />
        Altitude:
        <span className='data'> {this.props.alt.toFixed(3)}km</span>
        <br />
        Velocity:
        <span className='data'> {this.props.velocity.toFixed(3)}km</span>
        <br />
      </div>
    );
  }
}

export default TrackingData;
