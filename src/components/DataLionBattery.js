import React, { Component } from 'react';

import { getCurrentInfoData } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';

class DataLionBattery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentData: {}
    };
  }

  lionVoltageToPercentage(voltage) {
    //piecewise curve fit
    var percentage = 0.;
    if (voltage >= 3.986) {
      percentage = 495918.838867187*Math.pow(voltage, 6) - 12131731.9612119*Math.pow(voltage, 5) + 123643244.339164*Math.pow(voltage, 4) - 671989441.456614*Math.pow(voltage, 3) + 2054101328.6697*Math.pow(voltage, 2) - 3348296376.10735*voltage + 2273828011.07252;
    } else if (voltage < 3.986 && voltage >= 3.5985) {
      percentage = 14248.3732614517*Math.pow(voltage, 5) - 273888.006152098*Math.pow(voltage, 4) + 2105903.52769594*Math.pow(voltage, 3) - 8096118.96287537*Math.pow(voltage, 2) + 15563096.2967489*voltage - 11967212.7013982;
    } else if (voltage < 3.5985 && voltage >= 2.8) {
      percentage = 2942.12034556269*Math.pow(voltage, 5) - 48558.2340786669*Math.pow(voltage, 4) + 320492.380456582*Math.pow(voltage, 3) - 1057284.439237*Math.pow(voltage, 2) + 1743212.13657029*voltage - 1149073.13151426;
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
    getCurrentInfoData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        data.L1_BATTERY = this.lionVoltageToPercentage(data.L1_REF / 1000);
        data.L2_BATTERY = this.lionVoltageToPercentage(data.L2_REF / 1000);
        this.setState({
          currentData: data,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="subtitle">
          <p>LiOn Batteries</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            <div className="graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.currentData.L1_BATTERY)}
                options={params.opt_L_BATTERY(this.state.currentData.L1_BATTERY)}
              />
            </div>
            <h3>Battery #1</h3>
            {this.state.currentData.L1_CHGN && <h5 className="caption">Charging</h5>}
            {this.state.currentData.L1_ST && <h5 className="caption">Discharging</h5>}
          </div>
          <div className="col-6 graphCard">
            <div className="graph">
              <Doughnut
                data={params.data_L_BATTERY(this.state.currentData.L2_BATTERY)}
                options={params.opt_L_BATTERY(this.state.currentData.L2_BATTERY)}
              />
            </div>
            <h3>Battery #2</h3>
            {this.state.currentData.L2_CHGN && <h5 className="caption">Charging</h5>}
            {this.state.currentData.L2_ST && <h5 className="caption">Discharging</h5>}
          </div>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            <h3 className="statTitle">Voltage</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.currentData.L1_REF / 1000} V</h4>
              <p className="caption">LiOn #1</p>
              <h4 className="elem-2">{this.state.currentData.L2_REF / 1000} V</h4>
              <p className="caption">LiOn #2</p>
              <h4 className="elem-3">{this.state.currentData.L_REF / 1000} V</h4>
              <p className="caption">Active LiOn</p>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Current</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.currentData.L1_SNS / 1000} A</h4>
              <p className="caption">LiOn #1</p>
              <h4 className="elem-2">{this.state.currentData.L2_SNS / 1000} A</h4>
              <p className="caption">LiOn #2</p>
            </div>
          </div>
          <div className="col-4 graphCard">
            <h3 className="statTitle">Temperature</h3>
            <div className="graph">
              <h4 className="elem-1">{this.state.currentData.L1_TEMP} C</h4>
              <p className="caption">LiOn #1</p>
              <h4 className="elem-2">{this.state.currentData.L2_TEMP} C</h4>
              <p className="caption">LiOn #2</p>
            </div>
          </div>
        </div>
        <div className="subtitle white">
          <p>LiOn Battery #1 Digital Signals</p>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            {this.state.currentData.L1_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Charge Setting</p>
          </div>
          <div className="col-4 graphCard">
            {this.state.currentData.L1_DISG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Discharge Setting</p>
          </div>
          <div className="col-4 graphCard">
            {this.state.currentData.L1_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Fault Indicator</p>
          </div>
        </div>
        <div className="subtitle white">
          <p>LiOn Battery #2 Digital Signals</p>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            {this.state.currentData.L2_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Charge Setting</p>
          </div>
          <div className="col-4 graphCard">
            {this.state.currentData.L2_DISG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Discharge Setting</p>
          </div>
          <div className="col-4 graphCard">
            {this.state.currentData.L2_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
            <p className="caption">Fault Indicator</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataLionBattery;
