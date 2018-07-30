import React, { Component } from 'react';
import moment from 'moment';

import { getSignalsInPeriod } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataLed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    getSignalsInPeriod(['LED1TEMP', 'LED2TEMP', 'LED3TEMP', 'LED4TEMP',
                        'LED1SNS', 'LED2SNS', 'LED3SNS', 'LED4SNS'],
                        moment().subtract(1, 'days').toDate().getTime(),
                        moment().toDate().getTime()).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        console.log(moment().subtract(1, 'days').toDate().getTime());
        console.log(moment().toDate().getTime())
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
        <hr />
      </div>
    );
  }
}

export default DataLed;
