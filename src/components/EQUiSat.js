import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

import '../assets/Equisat.css';
import '../assets/Data.css';


class EQUiSat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      riseTime: 0,
      maxTime: 0,
      setTime: 0,
      receivedGeolocation: false,
    };
  }

  componentDidMount() {
    fetch('https://ipapi.co/json/').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({
        city: res.city,
      });
      return fetch(`http://tracking.brownspace.org/api/get_next_pass/ISS%20(ZARYA)/${res.latitude},${res.longitude},0`);
    }).then((res) => {
      return res.json();
    }).then((res) => {
      const riseDate = new Date(res.rise_time * 1000);
      const maxDate = new Date(res.max_alt_time * 1000);
      const setDate = new Date(res.set_time * 1000);
      this.setState({
        riseTime: riseDate.toString(),
        maxTime: maxDate.toString(),
        setTime: setDate.toString(),
      });
    });
  }

  componentWillReceiveProps() {
    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled &&
        this.props.coords && !this.state.receivedGeolocation) {
      this.setState({
        receivedGeolocation: true,
      });
      console.log(this.props.coords);
      fetch(`http://tracking.brownspace.org/api/get_next_pass/ISS%20(ZARYA)/${this.props.coords.latitude},${this.props.coords.longitude},0`).then((res) => {
        return res.json();
      }).then((res) => {
        const riseDate = new Date(res.rise_time * 1000);
        const maxDate = new Date(res.max_alt_time * 1000);
        const setDate = new Date(res.set_time * 1000);
        this.setState({
          riseTime: riseDate.toString(),
          maxTime: maxDate.toString(),
          setTime: setDate.toString(),
        });
      });
    }
  }

  render() {
    return (
      <div className='equisat'>
        <h3>Time to next overhead ({this.state.city}):</h3>
        <h4>{this.state.maxTime}</h4>
        <p>Rise time: {this.state.riseTime}</p>
        <p>Set time: {this.state.setTime}</p>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 20000,
})(EQUiSat);
