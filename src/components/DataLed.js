import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';

class DataLed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    getSignalsLatestSingle(['LED1TEMP', 'LED2TEMP', 'LED3TEMP', 'LED4TEMP',
                            'LED1SNS', 'LED2SNS', 'LED3SNS', 'LED4SNS']).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        Object.keys(data).forEach((key) => {
          data[key] = data[key].value;
        });

        this.setState({ data });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="subtitle">
          <p>LED</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            <h3 className="statTitle">Current</h3>
            <div className="graph grid">
              <div>
                <h4 className="elem-1">{this.state.data.LED1SNS / 1000} A</h4>
                <p className="caption">LED #1</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.data.LED2SNS / 1000} A</h4>
                <p className="caption">LED #2</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.data.LED3SNS / 1000} A</h4>
                <p className="caption">LED #3</p>
              </div>
              <div>
                <h4 className="elem-4">{this.state.data.LED4SNS / 1000} A</h4>
                <p className="caption">LED #4</p>
              </div>
            </div>
          </div>
          <div className="col-6 graphCard">
            <h3 className="statTitle">Temperature</h3>
            <div className="graph grid">
              <div>
                <h4 className="elem-1">{this.state.data.LED1TEMP} C</h4>
                <p className="caption">LED #1</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.data.LED2TEMP} C</h4>
                <p className="caption">LED #2</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.data.LED3TEMP} C</h4>
                <p className="caption">LED #3</p>
              </div>
              <div>
                <h4 className="elem-4">{this.state.data.LED4TEMP} C</h4>
                <p className="caption">LED #4</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataLed;
