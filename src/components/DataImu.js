import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataImu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accelerometer: {},
      gyroscope: {},
      magnetometer: {},
      data: {}
    };
  }

  componentDidMount() {
    getSignalsLatestSingle(["accelerometer1", "gyroscope", "magnetometer1", 'IMU_TEMP']).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        Object.keys(data).forEach((key) => {
          data[key] = data[key].value;
        });

        this.setState({
          accelerometer: data.accelerometer1,
          gyroscope: data.gyroscope,
          magnetometer: data.magnetometer1,
          IMU_TEMP: data.IMU_TEMP
        });
      }
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div className="subtitle">
          <p>IMU</p>
        </div>
        <h3 className="statTitle" style={{marginTop: '50px'}}>Temperature</h3>
        <h4 className="elem-1">{this.state.IMU_TEMP} C</h4>
        <div className="row">
          <div className="col-4 graphCard">
            <h3 className="statTitle">Accelerometer</h3>
            <div className="graph">
              <div>
                <h4 className="elem-1">{this.state.accelerometer.x} g</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.accelerometer.y} g</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.accelerometer.z} g</h4>
                <p className="caption">Z</p>
              </div>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Gyroscope</h3>
            <div className="graph">
              <div>
                <h4 className="elem-1">{this.state.gyroscope.x} d/s</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.gyroscope.y} d/s</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.gyroscope.z} d/s</h4>
                <p className="caption">Z</p>
              </div>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Magnetometer</h3>
            <div className="graph">
              <div>
                <h4 className="elem-1">{this.state.magnetometer.x} mG</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.magnetometer.y} mG</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.magnetometer.z} mG</h4>
                <p className="caption">Z</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataImu;
