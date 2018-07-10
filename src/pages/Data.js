import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { getCurrentInfoData } from '../utils/EQUiSatAPI';
import { signalToName } from '../utils/HumanReadables';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import '../assets/Data.css';

// import 'chartjs-plugin-datalabels';
import {Doughnut, Bar} from 'react-chartjs-2';

class DataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      L1_REF: '',
      L2_REF: '',
      L1_SNS: '',
      L2_SNS: '',
      L1_TEMP: '',
      L2_TEMP: '',
      BOOT_COUNT: '',
      PANELREF: '',
      L_REF: '',
      LF1REF: '',
      LF2REF: '',
      LF3REF: '',
      LF4REF: '',
      TIME_TO_FLASH: ''
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
        console.log(data);

        let time_to_flash;
        if (data.time_to_flash === 255) {
          time_to_flash = 'Not flashing';
        } else {
          time_to_flash = data.time_to_flash;
        }

        this.setState({
          L1_BATTERY: this.lionVoltageToPercentage(data.L1_REF / 1000),
          L2_BATTERY: this.lionVoltageToPercentage(data.L2_REF / 1000),
          L1_REF: data.L1_REF,
          L2_REF: data.L2_REF,
          L1_SNS: data.L1_SNS,
          L2_SNS: data.L2_SNS,
          L1_TEMP: data.L1_TEMP,
          L2_TEMP: data.L2_TEMP,
          BOOT_COUNT: data.boot_count,
          PANELREF: data.PANELREF,
          L_REF: data.L_REF,
          LF1REF: data.LF1REF,
          LF2REF: data.LF2REF,
          LF3REF: data.LF3REF,
          LF4REF: data.LF4REF,
          TIME_TO_FLASH: time_to_flash
        });
      }
    });

    getCurrentInfoData().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        const data = res.data[0];
        console.log(data);
        console.log(data.L1_REF / 1000);
        console.log(this.lionVoltageToPercentage(data.L1_REF / 1000));
        console.log(this.lionVoltageToPercentage(data.L2_REF / 1000));
      }
    });
  }

  render() {
    const data_L1_BATTERY = {
        datasets: [{
            data: [94, 6],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgb(100, 100, 100)',
            ],
            borderColor: [
                'rgb(37, 40, 48)',
                'rgb(37, 40, 48)',
            ],
            borderWidth: [5, 5]
        }],
        labels: ['Charged', 'Not charged']
    };

    const data_L2_BATTERY = {
        datasets: [{
            data: [60, 40],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgb(100, 100, 100)',
            ],
            borderColor: [
                'rgb(37, 40, 48)',
                'rgb(37, 40, 48)',
            ],
            borderWidth: [5, 5]
        }],
        labels: ['Charged', 'Not charged']
    };

    const data_L_VOLTAGE = {
        datasets: [{
            data: [this.state.L1_REF / 1000, this.state.L2_REF / 1000],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ]
        }],
        labels: ['#1', '#2']
    };

    const data_L_CURRENT = {
        datasets: [{
            data: [this.state.L1_SNS, this.state.L2_SNS],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ]
        }],
        labels: ['#1', '#2']
    };

    const data_L_TEMP = {
        datasets: [{
            data: [this.state.L1_TEMP, this.state.L2_TEMP],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ]
        }],
        labels: ['#1', '#2']
    };

    const data = {
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)'
            ]
        }],
        labels: ['Red', 'Blue', 'Purple', 'Yellow']
    };

    return (
      <div className="dataPage row">
        <MediaQuery query="(min-width: 769px)">
          <Navigation active='data' />
        </MediaQuery>
        <MediaQuery query="(max-width: 769px)">
          <NavigationMobile active='data' />
        </MediaQuery>
        <div className="col-2 data-navbar">
          <ul className="nav flex-column">
            <li className="nav-item text">
              Navigation
            </li>
            <li className="nav-item active">
              <a className="nav-link active" href="#">Current Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Preamble</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Idle Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Attitude</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Flash Burst</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Flash Comparison</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Low Power</a>
            </li>
          </ul>
        </div>
        <div className="dataContainer col-10">
          <h2>Current Data</h2>
          <div className="break">
            <p>Testing</p>
            <hr />
          </div>
          <div className="row">
            <div className="col-6 graphCard">
              <div className="graph">
                <Doughnut data={data_L1_BATTERY} options={{cutoutPercentage: 80, legend: {display: false}}}/>
              </div>
              <h3>LiOn #1 Battery</h3>
            </div>
            <div className="col-6 graphCard">
              <div className="graph">
                <Doughnut data={data_L2_BATTERY} options={{cutoutPercentage: 80, legend: {display: false}}}/>
              </div>
              <h3>LiOn #2 Battery</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-4 graphCard">
              <div className="graph">
                <Bar data={data_L_VOLTAGE} options={{scales: {yAxes: [{ticks: { min: 0 }}]}, legend: {display: false}}}/>
              </div>
              <h3>LiOn Voltages</h3>
            </div>
            <div className="col-4 graphCard">
              <div className="graph">
                <Bar data={data_L_CURRENT} options={{legend: {display: false}}}/>
              </div>
              <h3>LiOn Current</h3>
            </div>
            <div className="col-4 graphCard">
              <div className="graph">
                <Bar data={data_L_TEMP} options={{legend: {display: false}}}/>
              </div>
              <h3>LiOn Temperature</h3>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-3 graphCard">
              <div className="graph">
                <Doughnut data={data_L1_BATTERY} options={{cutoutPercentage: 60, legend: {display: false}}}/>
              </div>
              <h3>LiFePo #1 Battery</h3>
            </div>
            <div className="col-3 graphCard">
              <div className="graph">
                <Doughnut data={data_L2_BATTERY} options={{cutoutPercentage: 60, legend: {display: false}}}/>
              </div>
              <h3>LiFePo #2 Battery</h3>
            </div>
            <div className="col-3 graphCard">
              <div className="graph">
                <Doughnut data={data_L1_BATTERY} options={{cutoutPercentage: 60, legend: {display: false}}}/>
              </div>
              <h3>LiFePo #3 Battery</h3>
            </div>
            <div className="col-3 graphCard">
              <div className="graph">
                <Doughnut data={data_L2_BATTERY} options={{cutoutPercentage: 60, legend: {display: false}}}/>
              </div>
              <h3>LiFePo #4 Battery</h3>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6 graphCard">
              <div className="graph">
                <Bar data={data} options={{legend: {display: false}}}/>
              </div>
              <h3>Testing2</h3>
            </div>
            <div className="col-6 graphCard">
              <div className="graph">
                <Bar data={data} options={{legend: {display: false}}}/>
              </div>
              <h3>Testing2</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-6 graphCard">
              <div className="graph">
                <Bar data={data} options={{legend: {display: false}}}/>
              </div>
              <h3>Testing2</h3>
            </div>
            <div className="col-6 graphCard">
              <div className="graph">
                <Bar data={data} options={{legend: {display: false}}}/>
              </div>
              <h3>Testing2</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataPage;
