import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataImu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accelerometerX: {},
      accelerometerY: {},
      accelerometerZ: {},
      gyroscopeX: {},
      gyroscopeY: {},
      gyroscopeZ: {},
      magnetometerX: {},
      magnetometerY: {},
      magnetometerZ: {},
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
          accelerometerX: data.accelerometer1X,
          accelerometerY: data.accelerometer1Y,
          accelerometerZ: data.accelerometer1Z,        
          gyroscopeX: data.gyroscopeX,
          gyroscopeY: data.gyroscopeY,
          gyroscopeZ: data.gyroscopeZ,
          magnetometerX: data.magnetometer1X,
          magnetometerY: data.magnetometer1Y,
          magnetometerZ: data.magnetometer1Z,
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
