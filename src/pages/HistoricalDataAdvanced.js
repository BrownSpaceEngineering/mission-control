import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import DataNavbar from '../components/HistoricalDataNavbar';

import { signalToName } from '../utils/HumanReadables';
import { getSignalsInPeriod } from '../utils/EQUiSatAPI';
import { dataLineOne, dataLineTwo, dataLineThree, dataLineFour,
         historicalOptions, unitMappings } from '../utils/chartjs_params';
import '../assets/Data.css';

import { Line } from 'react-chartjs-2';

class HistoricalData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fromDate: moment().subtract(1, 'days'),
      toDate: moment(),
      option1: undefined,
      option2: undefined,
      option3: undefined,
      option4: undefined,
      data: { labels: [], datasets: [] },
      chartOptions: historicalOptions(),
      needToUpdateGraph: false,
    };

    const values = ["L1_REF","L2_REF", "LREF_AVG","L1_SNS","L2_SNS","PANELREF","L_REF","LF1REF","LF2REF","LF3REF","LF4REF","LFREF_AVG","LFB1SNS","LFB1OSNS","LFB2SNS","LFB2OSNS","LFBSNS_AVG","LED1SNS","LED2SNS","LED3SNS","LED4SNS","LEDSNS_AVG", "RAD_TEMP","IMU_TEMP","IR_FLASH_AMB","IR_SIDE1_AMB","IR_SIDE2_AMB","IR_RBF_AMB","IR_ACCESS_AMB","IR_TOP1_AMB","IR_AMB_AVG","IR_FLASH_OBJ","IR_SIDE1_OBJ","IR_SIDE2_OBJ","IR_RBF_OBJ","IR_ACCESS_OBJ","IR_TOP1_OBJ","LED1TEMP","LED2TEMP","LED3TEMP","LED4TEMP","LEDTEMP_AVG","L1_TEMP","L2_TEMP","LF1_TEMP","LF3_TEMP","LTEMP_AVG", "PD_TOP1","PD_SIDE1","PD_SIDE2","PD_FLASH","PD_ACCESS","PD_RBF","gyroscopeX","gyroscopeY","gyroscopeZ","accelerometer2X","accelerometer2Y","accelerometer2Z","magnetometer2X","magnetometer2Y","magnetometer2Z","L1_ST","L2_ST","L1_CHGN","L2_CHGN","LF_B1_CHGN","LF_B2_CHGN","L1_FAULTN","L2_FAULTN","LF_B1_FAULTN","LF_B2_FAULTN","PROG_MEM_REWRITTEN","FIRST_FLASH","ANTENNA_DEPLOYED","LION_1_CHARGED","LION_2_CHARGED","LIFEPO4_B1_CHARGED","LIFEPO4_B2_CHARGED","timestamp"]

    const options = [{value: null, label: "Select an option"}];

    values.forEach((value) => {
      const label = signalToName(value);
      options.push({ value, label});
    });

    console.log(options);
    this.options = options;

    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onSelectDropdown = this.onSelectDropdown.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  onChangeFromDate(date) {
    this.setState({
      fromDate: date,
      needToUpdateGraph: true,
    });
  }

  onChangeToDate(date) {
    this.setState({
      toDate: date,
      needToUpdateGraph: true,
    });
  }

  onSelectDropdown(number) {
    return (value) => {
      if (number === 1) {
        console.log(value);
        this.setState({
          option1: value,
          needToUpdateGraph: true,
        });
      } else if (number === 2) {
        this.setState({
          option2: value,
          needToUpdateGraph: true,
        });
      } else if (number === 3) {
        this.setState({
          option3: value,
          needToUpdateGraph: true,
        });
      } else if (number === 4) {
        this.setState({
          option4: value,
          needToUpdateGraph: true,
        });
      }
    }
  }

  fetchData() {
    const signals = [];
    [this.state.option1, this.state.option2, this.state.option3, this.state.option4].forEach((opt) => {
      if (opt !== undefined && opt.value) {
        signals.push(opt.value);
      }
    });
    console.log(signals);

    if (signals.length > 0) {
      return getSignalsInPeriod(signals,
                                this.state.fromDate.toDate().getTime(),
                                this.state.toDate.toDate().getTime()).then((res) => {

        // Get union of dates
        let labels = [];
        for (let key in res.data) {
          labels = [...labels, ...res.data[key].timestamps];
        }
        labels = [...new Set(labels)];
        for (let i = 0; i < labels.length; i++) {
          labels[i] = moment(labels[i]).format("MM/DD/YY, HH:mm:ss.SSS");
        }

        // Get datasets
        const datasets = [];
        const titles = {};
        if (this.state.option1 && this.state.option1.value) {
          const data1 = res.data[this.state.option1.value];
          const title = `${signalToName(this.state.option1.value)} (${unitMappings[this.state.option1.value]})`;
          datasets.push(dataLineOne(title, data1));
          titles.opt1 = title;
        }

        if (this.state.option2 && this.state.option2.value) {
          const data1 = res.data[this.state.option2.value];
          const title = `${signalToName(this.state.option2.value)} (${unitMappings[this.state.option2.value]})`;
          datasets.push(dataLineTwo(title, data1));
          titles.opt2 = title;
        }

        if (this.state.option3 && this.state.option3.value) {
          const data1 = res.data[this.state.option3.value];
          const title = `${signalToName(this.state.option3.value)} (${unitMappings[this.state.option3.value]})`;
          datasets.push(dataLineThree(title, data1));
          titles.opt3 = title;
        }

        if (this.state.option4 && this.state.option4.value) {
          const data1 = res.data[this.state.option4.value];
          const title = `${signalToName(this.state.option4.value)} (${unitMappings[this.state.option4.value]})`;
          datasets.push(dataLineFour(title, data1));
          titles.opt4 = title;
        }

        const chartOptions = historicalOptions(titles.opt1, titles.opt2, titles.opt3, titles.opt4);
        console.log(datasets);

        this.setState({
          data: { datasets },
          needToUpdateGraph: false,
          chartOptions,
        });
      });
    } else {
      this.setState({
        data: { labels: [], datasets: [] },
        needToUpdateGraph: false,
        chartOptions: historicalOptions(),
      });
    }
  }

  render() {
    // TODO: Refactor this code so that fetchData is called in onChangeFromDate,
    //       onChangeToDate, onSelectDropDown so that this.setState is not called
    //       during render(). But that won't be done anytime soon...
    if (this.state.needToUpdateGraph) {
      this.fetchData();
    }

    return (
      <div className="dataPage row">
        <MediaQuery query="(min-width: 769px)">
          <Navigation active='data' />
        </MediaQuery>
        <MediaQuery query="(max-width: 769px)">
          <NavigationMobile active='data' />
        </MediaQuery>
        <div className="col-2">
          <DataNavbar />
        </div>
        <div className="dataContainer col-10">
          <h2>Historical Data (Advanced)</h2>
          <div className="break">
            <hr />
          </div>
          <div className="row">
            <div className="col-6">
              <DatePicker
                selected={this.state.fromDate}
                onChange={this.onChangeFromDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </div>
            <div className="col-6">
              <DatePicker
                selected={this.state.toDate}
                onChange={this.onChangeToDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
            />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <Dropdown
                options={this.options}
                onChange={this.onSelectDropdown(1)}
                value={this.state.option1}
                placeholder="Select an option"
              />
            </div>
            <div className="col-3">
              <Dropdown
                options={this.options}
                onChange={this.onSelectDropdown(2)}
                value={this.state.option2}
                placeholder="Select an option"
              />
            </div>
            <div className="col-3">
              <Dropdown
                options={this.options}
                onChange={this.onSelectDropdown(3)}
                value={this.state.option3}
                placeholder="Select an option"
              />
            </div>
            <div className="col-3">
              <Dropdown
                options={this.options}
                onChange={this.onSelectDropdown(4)}
                value={this.state.option4}
                placeholder="Select an option"
              />
            </div>
          </div>
          <Line
            data={this.state.data}
            options={this.state.chartOptions}
          />
        </div>
      </div>
    );
  }
}

export default HistoricalData;
