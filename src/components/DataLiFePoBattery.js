import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';

class DataLiFePoBattery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  lifepo4VoltageToPercentage(voltage) {
    //piecewise curve fit
    var percentage = 0.;
    if (voltage >= 3.299) {
      percentage = 7481.35161972045*Math.pow(voltage, 5) - 129698.307311745*Math.pow(voltage, 4) + 899320.30659425*Math.pow(voltage, 3) - 3117698.8919505*Math.pow(voltage, 2) + 5403781.60634651*voltage - 3746176.3794266;
    } else if (voltage < 3.299 && voltage >= 3.168625) {
      percentage = -5538027.91287231*Math.pow(voltage, 5) + 89768047.5291653*Math.pow(voltage, 4) - 582052268.16249*Math.pow(voltage, 3) + 1887056369.17257*Math.pow(voltage, 2) - 3059070288.85044*voltage + 1983648268.20567;
    } else if (voltage < 3.168625 && voltage >= 2.4) {
      percentage = 9361.00030899047*Math.pow(voltage, 6) - 155484.297233582*Math.pow(voltage, 5) + 1074915.58123016*Math.pow(voltage, 4) - 3958921.17254791*Math.pow(voltage, 3) + 8192152.17593754*Math.pow(voltage, 2) - 9030097.66266999*voltage + 4142159.89895692;
    } else {
      percentage = 0;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }
    percentage = Math.round(percentage);
    return percentage;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getSignalsLatestSingle(['LF1REF', 'LF2REF', 'LF3REF', 'LF4REF', 'LFB1SNS',
                            'LFB1OSNS', 'LFB2SNS', 'LFB2OSNS', 'LF1_TEMP',
                            'LF3_TEMP', 'LF_B1_RUN_CHG', 'LF_B1_FAULTN',
                            'LF_B2_RUN_CHG', 'LF_B2_FAULTN', 'LF_B1_CHGN',
                            'LF_B2_CHGN', 'LF_B3_CHGN', 'LF_B4_CHGN']).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        Object.keys(data).forEach((key) => {
          data[key] = data[key].value;
        });

        data.LF1_BATTERY = this.lifepo4VoltageToPercentage(data.LF1REF / 1000);
        data.LF2_BATTERY = this.lifepo4VoltageToPercentage(data.LF2REF / 1000);
        data.LF3_BATTERY = this.lifepo4VoltageToPercentage(data.LF3REF / 1000);
        data.LF4_BATTERY = this.lifepo4VoltageToPercentage(data.LF4REF / 1000);

        this.setState({ data });
      }
    }).catch((err) => {
      setTimeout(this.test(),10000);
    });
  }
  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="subtitle">
          <p>LiFePO Batteries</p>
        </div>
        <div className="row">
          <div className="col-3 graphCard">
            <div className="graph small-graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.data.LF1_BATTERY)}
                options={params.opt_LF_BATTERY(this.state.data.LF1_BATTERY)}
              />
            </div>
            <h3>Battery #1</h3>
            {this.state.data.LF_B1_CHGN && <h5 className="caption">Charging</h5>}
          </div>
          <div className="col-3 graphCard">
            <div className="graph small-graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.data.LF2_BATTERY)}
                options={params.opt_LF_BATTERY(this.state.data.LF2_BATTERY)}
              />
            </div>
            <h3>Battery #2</h3>
            {this.state.data.LF_B2_CHGN && <h5 className="caption">Charging</h5>}
          </div>
          <div className="col-3 graphCard">
            <div className="graph small-graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.data.LF3_BATTERY)}
                options={params.opt_LF_BATTERY(this.state.data.LF3_BATTERY)}
              />
            </div>
            <h3>Battery #3</h3>
            {this.state.data.LF_B3_CHGN && <h5 className="caption">Charging</h5>}
          </div>
          <div className="col-3 graphCard">
            <div className="graph small-graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.data.LF4_BATTERY)}
                options={params.opt_LF_BATTERY(this.state.data.LF4_BATTERY)}
              />
            </div>
            <h3>Battery #4</h3>
            {this.state.data.LF_B4_CHGN && <h5 className="caption">Charging</h5>}
          </div>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            <h3 className="statTitle">Voltages</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.data.LF1REF / 1000} V</h4>
              <p className="caption">LiFePO #1</p>
              <h4 className="elem-2">{this.state.data.LF2REF / 1000} V</h4>
              <p className="caption">LiFePO #2</p>
              <h4 className="elem-3">{this.state.data.LF3REF / 1000} V</h4>
              <p className="caption">LiFePO #3</p>
              <h4 className="elem-4">{this.state.data.LF4REF / 1000} V</h4>
              <p className="caption">LiFePO #4</p>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Current</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.data.LFB1SNS / 1000} A</h4>
              <p className="caption">Bank #1</p>
              <h4 className="elem-2">{this.state.data.LFB1OSNS / 1000} A</h4>
              <p className="caption">Bank #1 Output</p>
              <h4 className="elem-3">{this.state.data.LFB2SNS / 1000} A</h4>
              <p className="caption">Bank #2</p>
              <h4 className="elem-4">{this.state.data.LFB2OSNS / 1000} A</h4>
              <p className="caption">Bank #2 Output</p>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Temperature</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.data.LF1_TEMP} C</h4>
              <p className="caption">LiFePO #1</p>
              <h4 className="elem-2">{this.state.data.LF3_TEMP} C</h4>
              <p className="caption">LiFePO #3</p>
            </div>
          </div>
        </div>
        <div className="subtitle white">
          <p>LiFePo Bank #1 Digital Signals</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            {this.state.data.LF_B1_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Charge Setting</p>
          </div>
          <div className="col-6 graphCard">
            {this.state.data.LF_B1_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Fault Indicator</p>
          </div>
        </div>
        <div className="subtitle white">
          <p>LiFePo Bank #2 Digital Signals</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            {this.state.data.LF_B2_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Charge Setting</p>
          </div>
          <div className="col-6 graphCard">
            {this.state.data.LF_B2_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Fault Indicator</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataLiFePoBattery;
