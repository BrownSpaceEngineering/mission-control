import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { getPreambleData } from '../utils/EQUiSatAPI';
import { signalToName } from '../utils/HumanReadables';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import DataNavbar from '../components/DataNavbar';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';
import Chart from 'chart.js';

class DataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preambleData: {}
    };
  }

  componentDidMount() {
    getPreambleData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        console.log(data);

        this.setState({
          preambleData: data.preamble,
        });
      }
    });
  }

  render() {
    return (
      <div className="dataPage row">
        <MediaQuery query="(min-width: 769px)">
          <Navigation active='data' />
        </MediaQuery>
        <MediaQuery query="(max-width: 769px)">
          <NavigationMobile active='data' />
        </MediaQuery>
        <div className="col-2">
          <DataNavbar active='preamble' />
        </div>
        <div className="dataContainer col-10">
          <h2>Preamble</h2>
          <div className="break">
            <hr />
          </div>
          <div className="subtitle">
            <p>Call Sign</p>
            <h5 className="announcement">{this.state.preambleData.callsign}</h5>
          </div>
          <div className="subtitle">
            <p>Satellite State</p>
            <h5 className="announcement">{this.state.preambleData.satellite_state}</h5>
          </div>
          <div className="subtitle">
            <p>Timestamp</p>
            <h5 className="announcement">{this.state.preambleData.timestamp}</h5>
          </div>
          <div className="subtitle">
            <p>Number of errors</p>
            <h5 className="announcement">{this.state.preambleData.num_errors}</h5>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default DataPage;
