import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataImu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accelerometerX: "",
      accelerometerY: "",
      accelerometerZ: "",
      gyroscopeX: "",
      gyroscopeY: "",
      gyroscopeZ: "",
      magnetometerX: "",
      magnetometerY: "",
      magnetometerZ: "",
      IMU_TEMP: "",

      data: {}
    };
  }

  componentDidMount() {
    getSignalsLatestSingle(["accelerometer1", "gyroscope", "magnetometer1", "accelerometer1X", "accelerometer1Y", "accelerometer1Z", "gyroscopeX", "gyroscopeY", "gyroscopeZ", "magnetometer1X", "magnetometer1Y", "magnetometer1Z", 'IMU_TEMP']).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        Object.keys(data).forEach((key) => {
          data[key] = data[key].value;
        });


        this.setState({
          accelerometerX: (typeof data.accelerometer1X !== 'undefined') ? data.accelerometer1X : "?",
          accelerometerY: (typeof data.accelerometer1Y !== 'undefined') ? data.accelerometer1Y : "?",
          accelerometerZ: (typeof data.accelerometer1Z !== 'undefined') ? data.accelerometer1Z : "?",
          gyroscopeX: (typeof data.gyroscopeX !== 'undefined') ? data.gyroscopeX : "?",
          gyroscopeY: (typeof data.gyroscopeY !== 'undefined') ? data.gyroscopeY : "?",
          gyroscopeZ: (typeof data.gyroscopeZ !== 'undefined') ? data.gyroscopeZ : "?",
          magnetometerX: (typeof data.magnetometer1X !== 'undefined') ? data.magnetometer1X : "?",
          magnetometerY: (typeof data.magnetometer1Y !== 'undefined') ? data.magnetometer1Y : "?",
          magnetometerZ: (typeof data.magnetometer1Z !== 'undefined') ? data.magnetometer1Z : "?",
          IMU_TEMP: data.IMU_TEMP.toFixed(2),
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
                <h4 className="elem-1">{this.state.accelerometerX} g</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.accelerometerY} g</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.accelerometerZ} g</h4>
                <p className="caption">Z</p>
              </div>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Gyroscope</h3>
            <div className="graph">
              <div>
                <h4 className="elem-1">{this.state.gyroscopeX} d/s</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.gyroscopeY} d/s</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.gyroscopeZ} d/s</h4>
                <p className="caption">Z</p>
              </div>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Magnetometer</h3>
            <div className="graph">
              <div>
                <h4 className="elem-1">{this.state.magnetometerX} mG</h4>
                <p className="caption">X</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.magnetometerY} mG</h4>
                <p className="caption">Y</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.magnetometerZ} mG</h4>
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
