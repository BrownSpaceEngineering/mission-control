import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { getCurrentInfoData, getIdleData } from '../utils/EQUiSatAPI';
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
      idleData: {}
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
    getIdleData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0].payload;

        data.L1_BATTERY = this.lionVoltageToPercentage(data.L1_REF / 1000);
        data.L2_BATTERY = this.lionVoltageToPercentage(data.L2_REF / 1000);
        console.log(data);

        this.setState({
          idleData: data,
        });
      }
    });

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
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
          <DataNavbar active='idle-data' />
        </div>
        <div className="dataContainer col-10">
          <h2>Idle Data</h2>
          <div className="break">
            <hr />
          </div>
          <div className="subtitle">
            <p>LiOn Batteries</p>
          </div>
          <div className="row">
            <div className="col-6 graphCard">
              <div className="graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.idleData.L1_BATTERY)}
                  options={params.opt_L_BATTERY(this.state.idleData.L1_BATTERY)}
                />
              </div>
              <h3>Battery #1</h3>
              {this.state.idleData.L1_CHGN && <h5 className="caption">Charging</h5>}
              {this.state.idleData.L1_ST && <h5 className="caption">Discharging</h5>}
            </div>
            <div className="col-6 graphCard">
              <div className="graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.idleData.L2_BATTERY)}
                  options={params.opt_L_BATTERY(this.state.idleData.L2_BATTERY)}
                />
              </div>
              <h3>Battery #2</h3>
              {this.state.idleData.L2_CHGN && <h5 className="caption">Charging</h5>}
              {this.state.idleData.L2_ST && <h5 className="caption">Discharging</h5>}
            </div>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              <h3 className="statTitle">Voltage</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.idleData.L1_REF / 1000} V</h4>
                <p className="caption">LiOn #1</p>
                <h4 className="elem-2">{this.state.idleData.L2_REF / 1000} V</h4>
                <p className="caption">LiOn #2</p>
                <h4 className="elem-3">{this.state.idleData.L_REF / 1000} V</h4>
                <p className="caption">Active LiOn</p>
              </div>
            </div>
            <div className="col-4 graphCard">
              <h3 className="statTitle">Current</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.idleData.L1_SNS / 1000} A</h4>
                <p className="caption">LiOn #1</p>
                <h4 className="elem-2">{this.state.idleData.L2_SNS / 1000} A</h4>
                <p className="caption">LiOn #2</p>
              </div>
            </div>
            <div className="col-4 graphCard">
              <h3 className="statTitle">Temperature</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.idleData.L1_TEMP} C</h4>
                <p className="caption">LiOn #1</p>
                <h4 className="elem-2">{this.state.idleData.L2_TEMP} C</h4>
                <p className="caption">LiOn #2</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="subtitle">
            <p>LiOn Battery #1 Digital Signals</p>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              {this.state.idleData.L1_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Charge Setting</p>
            </div>
            <div className="col-4 graphCard">
              {this.state.idleData.L1_DISG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Discharge Setting</p>
            </div>
            <div className="col-4 graphCard">
              {this.state.idleData.L1_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Fault Indicator</p>
            </div>
          </div>
          <hr />
          <div className="subtitle">
            <p>LiOn Battery #2 Digital Signals</p>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              {this.state.idleData.L2_RUN_CHG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Charge Setting</p>
            </div>
            <div className="col-4 graphCard">
              {this.state.idleData.L2_DISG ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Discharge Setting</p>
            </div>
            <div className="col-4 graphCard">
              {this.state.idleData.L2_FAULTN ? <h5 className="elem-5">ON</h5> : <h5 className="elem-1">OFF</h5>}
              <p className="caption">Fault Indicator</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default DataPage;
