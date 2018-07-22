import React, { Component } from 'react';

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
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.homeLocation !== this.props.homeLocation ||
        newProps.pinLocation !== this.props.pinLocation) {
      let locToSearch;
      if (newProps.pinLocation.city === null || newProps.pinLocation.lat === null ||
          newProps.pinLocation.lon === null) {
        locToSearch = newProps.homeLocation;
      } else {
        locToSearch = newProps.pinLocation;
      }

      let newCity;
      if (locToSearch.city.length === 0) {
        newCity = `${locToSearch.lon.toFixed(2)}, ${locToSearch.lat.toFixed(2)}`;
      } else {
        newCity = locToSearch.city;
      }
      fetch(`http://tracking.brownspace.org/api/get_next_pass/${locToSearch.lon},${locToSearch.lat},0`).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            const riseDate = new Date(res.rise_time * 1000);
            const maxDate = new Date(res.max_alt_time * 1000);
            const setDate = new Date(res.set_time * 1000);
            this.setState({
              riseTime: riseDate.toString(),
              maxTime: maxDate.toString(),
              setTime: setDate.toString(),
              city: newCity,
            });
          });
        } else {
          this.setState({
            city: newCity,
            maxTime: 'Not anytime soon',
            riseTime: '',
            setTime: ''
          });
        }
      });
    }
  }

  render() {
    return (
      <div className='equisat'>
        <h3>Time to next overhead ({this.state.city}):</h3>
        <h4>{this.state.maxTime}</h4>
        { this.state.riseTime.length > 0 &&
          <p>Rise time: {this.state.riseTime}</p>
        }
        { this.state.setTime.length > 0 &&
          <p>Set time: {this.state.setTime}</p>
        }
      </div>
    );
  }
}

export default EQUiSat;
