import React, { Component } from 'react';

import { getPreambleData } from '../utils/EQUiSatAPI';

import '../assets/Preamble.css';
import '../assets/Data.css';

class Preamble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callsign: "",
      messageType: "",
      satelliteState: "",
      timestamp: ""
    }
  }

  formatSeconds(seconds) {
    function z(n) {return (n < 10 ? '0' : '') + n;}
    return z(seconds / 3600 | 0) + ' hours ' + z((seconds % 3600) / 60 | 0) + ' minutes'
  }

  componentDidMount() {
    getPreambleData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0].preamble;
        this.setState({
          callsign: data.callsign,
          messageType: data.message_type,
          satelliteState: data.satellite_state,
          timestamp: this.formatSeconds(data.timestamp)
        });
      }
    });
  }

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
        <span className="data"> {this.state.timestamp}</span>
        <br /> <br />
      </div>
    );
  }
}

export default Preamble;
