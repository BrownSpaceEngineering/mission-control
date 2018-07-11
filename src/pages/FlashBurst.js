import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { getCurrentInfoData, getSignalsLatestSingle } from '../utils/EQUiSatAPI';
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
      currentData: {},
      lifepoData: {}
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

        data.LF1_BATTERY = this.lifepo4VoltageToPercentage(data.LF1REF / 1000);
        data.LF2_BATTERY = this.lifepo4VoltageToPercentage(data.LF2REF / 1000);
        data.LF3_BATTERY = this.lifepo4VoltageToPercentage(data.LF3REF / 1000);
        data.LF4_BATTERY = this.lifepo4VoltageToPercentage(data.LF4REF / 1000);
        console.log(data);

        this.setState({
          currentData: data,
        });
      }
    });

    getSignalsLatestSingle(['LFB1SNS', 'LFB1OSNS', 'LFB2SNS', 'LFB2OSNS', 'LF1_TEMP', 'LF3_TEMP']).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        this.setState({
          lifepoData: {
            LFB1SNS: data.LFB1SNS.value,
            LFB1OSNS: data.LFB1OSNS.value,
            LFB2SNS: data.LFB2SNS.value,
            LFB2OSNS: data.LFB2OSNS.value,
            LF1_TEMP: data.LF1_TEMP.value,
            LF3_TEMP: data.LF3_TEMP.value,
          }
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
          <DataNavbar active='flash-burst' />
        </div>
        <div className="dataContainer col-10">
          <h2>Current Data</h2>
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
          <hr />
          <div className="subtitle">
            <p>LiFePO Batteries</p>
          </div>
          <div className="row">
            <div className="col-3 graphCard">
              <div className="graph small-graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.currentData.LF1_BATTERY)}
                  options={params.opt_LF_BATTERY(this.state.currentData.LF1_BATTERY)}
                />
              </div>
              <h3>Battery #1</h3>
              {this.state.currentData.LF_B1_CHGN && <h5 className="caption">Charging</h5>}
            </div>
            <div className="col-3 graphCard">
              <div className="graph small-graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.currentData.LF2_BATTERY)}
                  options={params.opt_LF_BATTERY(this.state.currentData.LF2_BATTERY)}
                />
              </div>
              <h3>Battery #2</h3>
              {this.state.currentData.LF_B2_CHGN && <h5 className="caption">Charging</h5>}
            </div>
            <div className="col-3 graphCard">
              <div className="graph small-graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.currentData.LF3_BATTERY)}
                  options={params.opt_LF_BATTERY(this.state.currentData.LF3_BATTERY)}
                />
              </div>
              <h3>Battery #3</h3>
              {this.state.currentData.LF_B3_CHGN && <h5 className="caption">Charging</h5>}
            </div>
            <div className="col-3 graphCard">
              <div className="graph small-graph">
                <Doughnut
                  data={params.data_L_BATTERY(this.state.currentData.LF4_BATTERY)}
                  options={params.opt_LF_BATTERY(this.state.currentData.LF4_BATTERY)}
                />
              </div>
              <h3>Battery #4</h3>
              {this.state.currentData.LF_B4_CHGN && <h5 className="caption">Charging</h5>}
            </div>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              <h3 className="statTitle">Voltages</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.currentData.LF1REF / 1000} V</h4>
                <p className="caption">LiFePO #1</p>
                <h4 className="elem-2">{this.state.currentData.LF2REF / 1000} V</h4>
                <p className="caption">LiFePO #2</p>
                <h4 className="elem-3">{this.state.currentData.LF3REF / 1000} V</h4>
                <p className="caption">LiFePO #3</p>
                <h4 className="elem-4">{this.state.currentData.LF4REF / 1000} V</h4>
                <p className="caption">LiFePO #4</p>
              </div>
            </div>
            <div className="col-4 graphCard">
              <h3 className="statTitle">Current</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.lifepoData.LFB1SNS / 1000} A</h4>
                <p className="caption">Bank #1</p>
                <h4 className="elem-2">{this.state.lifepoData.LFB1OSNS / 1000} A</h4>
                <p className="caption">Bank #1 Output</p>
                <h4 className="elem-3">{this.state.lifepoData.LFB2SNS / 1000} A</h4>
                <p className="caption">Bank #2</p>
                <h4 className="elem-4">{this.state.lifepoData.LFB2OSNS / 1000} A</h4>
                <p className="caption">Bank #2 Output</p>
              </div>
            </div>
            <div className="col-4 graphCard">
              <h3 className="statTitle">Temperature</h3>
              <div className="graph">
                <h4 className="elem-1">{this.state.lifepoData.LF1_TEMP} C</h4>
                <p className="caption">LiFePO #1</p>
                <h4 className="elem-2">{this.state.lifepoData.LF3_TEMP} C</h4>
                <p className="caption">LiFePO #3</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="subtitle">
            <p>Misc Information</p>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              <p className="caption">Time to next flash</p>
              <h5 className="elem-1">{this.state.currentData.time_to_flash}</h5>
              <p className="caption">Reboot count</p>
              <h5 className="elem-1">{this.state.currentData.boot_count}</h5>
              <p className="caption">Solar Panel Voltage</p>
              <h5 className="elem-1 last">{this.state.currentData.PANELREF}</h5>
            </div>
            <div className="col-4 graphCard">
              <p className="caption">{signalToName('L1_RUN_CHG')}</p>
              <h5 className="elem-1">{this.state.currentData.L1_RUN_CHG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('L1_DISG')}</p>
              <h5 className="elem-1">{this.state.currentData.L1_DISG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('L1_FAULTN')}</p>
              <h5 className="elem-1">{this.state.currentData.L1_FAULTN ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('L2_RUN_CHG')}</p>
              <h5 className="elem-1">{this.state.currentData.L2_RUN_CHG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('L2_DISG')}</p>
              <h5 className="elem-1">{this.state.currentData.L2_DISG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('L2_FAULTN')}</p>
              <h5 className="elem-1 last">{this.state.currentData.L2_FAULTN ? 'On' : 'Off'}</h5>
            </div>
            <div className="col-4 graphCard">
              <p className="caption">{signalToName('LF_B1_RUN_CHG')}</p>
              <h5 className="elem-1">{this.state.currentData.LF_B1_RUN_CHG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('LF_B1_FAULTN')}</p>
              <h5 className="elem-1">{this.state.currentData.LF_B1_FAULTN ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('LF_B2_RUN_CHG')}</p>
              <h5 className="elem-1">{this.state.currentData.LF_B2_RUN_CHG ? 'On' : 'Off'}</h5>
              <p className="caption">{signalToName('LF_B2_FAULTN')}</p>
              <h5 className="elem-1 last">{this.state.currentData.LF_B2_FAULTN ? 'On' : 'Off'}</h5>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default DataPage;
