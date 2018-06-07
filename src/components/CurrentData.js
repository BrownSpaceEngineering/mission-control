import React, { Component } from 'react';

import '../assets/CurrentData.css';
import '../assets/Data.css';

class CurrentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lionVoltages: "0000",
      lionCurrents: "0000",
      lionTemperature: "0000",
      rebootCount: "0000",
      batteryCharging: "0000",
      lifepoVoltage: "0000",
      nextFlash: "0000"
    }
  }

  render() {
    return (
      <div className='currentData'>
        <h1>CURRENT DATA</h1>
        LiOn Voltages:
        <span className='data'> {this.state.lionVoltages}</span>
        <br />
        LiOn Currents:
        <span className='data'> {this.state.lionCurrents}</span>
        <br />
        LiOn Temperature:
        <span className='data'> {this.state.lionTemperature}</span>
        <br /> <br />
        Reboot Count:
        <span className='data'> {this.state.rebootCount}</span>
        <br />
        Battery Charging:
        <span className='data'> {this.state.batteryCharging}</span>
        <br />
        LiFePo Voltage:
        <span className='data'> {this.state.lifepoVoltage}</span>
        <br /> <br />
        Time to Next Flash:
        <span className='data'> {this.state.nextFlash}</span>
        <br /> <br />
      </div>
    );
  }
}

export default CurrentData;
