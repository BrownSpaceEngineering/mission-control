import React, { Component } from 'react';

import { getPreambleData } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataPreamble extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preambleData: {},
      data: {}
    };
  }

  componentDidMount() {
    getPreambleData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0].preamble;
        const date = new Date(Date.parse(res.data[0].created));
        console.log(date);
        data.created = date.toLocaleString();
        this.setState({
          preambleData: data
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="subtitle">
          <p>Last Transmission</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            <div className="subtitle">
              <p>Call Sign</p>
              <h5 className="announcement">{this.state.preambleData.callsign}</h5>
            </div>
          </div>
          <div className="col-6 graphCard">
            <div className="subtitle">
              <p>Satellite State</p>
              <h5 className="announcement">{this.state.preambleData.satellite_state}</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            <div className="subtitle">
              <p>Seconds since boot</p>
              <h5 className="announcement">{this.state.preambleData.timestamp}</h5>
            </div>
          </div>
          <div className="col-6 graphCard">
            <div className="subtitle">
              <p>Timestamp</p>
              <h5 className="announcement">{this.state.preambleData.created}</h5>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataPreamble;
