import React, { Component } from 'react';

import '../assets/Equisat.css';
import '../assets/Data.css';


class EQUiSat extends Component {
  render() {
    return (
      <div className='equisat'>
        <h3>Time to next overhead:</h3>
        <h4>{this.props.maxTime}</h4>
        <p>Rise time: {this.props.riseTime}</p>
        <p>Set time: {this.props.setTime}</p>
      </div>
    );
  }
}

export default EQUiSat;
