import React, { Component } from 'react';

import { getCurrentInfoData } from '../utils/EQUiSatAPI';
import { signalToName } from '../utils/HumanReadables';

import '../assets/CurrentData.css';
import '../assets/Data.css';

class CurrentData extends Component {
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
  }

  render() {
    return (
      <div className='currentData'>
        <h1>CURRENT DATA</h1>
        { signalToName('L1_REF')}: <span className='data'>{this.state.L1_REF}</span>
        <br />
        { signalToName('L1_SNS')}: <span className='data'>{this.state.L1_SNS}</span>
        <br />
        { signalToName('L1_TEMP')}: <span className='data'>{this.state.L1_TEMP}</span>
        <br /> <br />
        { signalToName('L2_REF')}: <span className='data'>{this.state.L2_REF}</span>
        <br />
        { signalToName('L2_SNS')}: <span className='data'>{this.state.L2_SNS}</span>
        <br />
        { signalToName('L2_TEMP')}: <span className='data'>{this.state.L2_TEMP}</span>
        <br /> <br />
        Boot count: <span className='data'>{this.state.BOOT_COUNT}</span>
        <br />
        { signalToName('PANELREF')}: <span className='data'>{this.state.PANELREF}</span>
        <br />
        { signalToName('L_REF')}: <span className='data'>{this.state.L_REF}</span>
        <br /> <br />
        { signalToName('LF1REF')}: <span className='data'>{this.state.LF1REF}</span>
        <br />
        { signalToName('LF2REF')}: <span className='data'>{this.state.LF2REF}</span>
        <br />
        { signalToName('LF3REF')}: <span className='data'>{this.state.LF3REF}</span>
        <br />
        { signalToName('LF4REF')}: <span className='data'>{this.state.LF4REF}</span>
        <br /> <br />
        Time to next flash: <span className='data'>{this.state.TIME_TO_FLASH}</span>
        <br /> <br />
      </div>
    );
  }
}

export default CurrentData;
