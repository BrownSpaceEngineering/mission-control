import React, { Component } from 'react';

import '../assets/TrackingData.css';
import '../assets/Data.css';

class TrackingData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      velocity: 0,
    }
  }

  componentDidMount() {
    setInterval(() => {
      fetch('http://35.192.71.2:3000/api/get_velocity/ISS%20(ZARYA)').then((result) => {
        return result.json();
      }).then((result) => {
        this.setState({
          velocity: result.velocity,
        });
      });
    }, 1000);
  }

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
        <span className='data'> {this.state.velocity.toFixed(3)}km</span>
        <br />
      </div>
    );
  }
}

export default TrackingData;
