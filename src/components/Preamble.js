import React, { Component } from 'react';

import '../assets/Preamble.css';
import '../assets/Data.css';

class Preamble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callsign: "WL9XZE",
      messageType: "LOW_POWER",
      satelliteState: "ANTENNA_DEPLOY",
      timestamp: "0.000"
    }
  }

  // updateCallsign = () => {
  //
  // }

  // updateMessageType = () => {
  //
  // }

  // updateSatelliteState = () => {
  //
  // }

  render() {
    return (
      <div className="preamble">
        <h1>PREAMBLE</h1>
        Callsign:
        <span className="data"> {this.state.callsign}</span>
        <br />
        Message Type:
        <span className="data"> {this.state.messageType}</span>
        <br />
        Satellite State:
        <span className="data"> {this.state.satelliteState}</span>
        <br /> <br />
        Time Since Last Satellite Start:
        <span className="data"> {this.state.timestamp}sec</span>
        <br /> <br />
      </div>
    );
  }
}

export default Preamble;
