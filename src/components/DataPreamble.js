import React, { Component } from 'react';

import { getSignalsLatestSingle, getPreambleData } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';

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
          <p>Preamble</p>
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
              <p>Timestamp</p>
              <h5 className="announcement">{this.state.preambleData.timestamp}</h5>
            </div>
          </div>
          <div className="col-6 graphCard">
            <div className="subtitle">
              <p>Number of errors</p>
              <h5 className="announcement">{this.state.preambleData.num_errors}</h5>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataPreamble;
