import React, {Component} from 'react';

import '../assets/TrackingData.css';
import '../assets/Data.css';

class TrackingData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      riseTime: 0,
      maxTime: 0,
      setTime: 0,
      passes: [],
    };
  }

  componentWillReceiveProps(newProps) {
    // no need to update if props are still the same
    if (newProps.homeLocation === this.props.homeLocation
        && newProps.pinLocation === this.props.pinLocation) {
      return;
    }

    let locToSearch;
    if (newProps.pinLocation.city === null
        || newProps.pinLocation.lat === null
        || newProps.pinLocation.lon === null) {
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

  render() {
    return (
        <div className='trackingData'>
          <h1>TRACKING</h1>
          Latitude:
          <span className='data'> {this.props.lat.toFixed(3)}°</span>
          <br/>
          Longitude:
          <span className='data'> {this.props.lon.toFixed(3)}°</span>
          <br/>
          Altitude:
          <span className='data'> {this.props.alt.toFixed(3)}km</span>
          <br/>
          Velocity:
          <span className='data'> {this.props.velocity.toFixed(3)}km</span>
          <br/>
          <h3>Time to next overhead ({this.state.city}):</h3>
          <h4>{this.state.maxTime}</h4>
          {this.state.riseTime.length > 0 &&
          <p>Rise time: {this.state.riseTime}</p>
          }
          {this.state.setTime.length > 0 &&
          <p>Set time: {this.state.setTime}</p>
          }
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 0 10px',
          }}>
            <button onClick={this.props.extraPassesOnClick}>Get More Passes</button>
          </div>
        </div>
    );
  }
}

export default TrackingData;
