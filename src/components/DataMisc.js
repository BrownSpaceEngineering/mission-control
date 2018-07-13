import React, { Component } from 'react';

import { getCurrentInfoData, getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataMisc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentData: {},
      data: {}
    };
  }

  componentDidMount() {
    getCurrentInfoData(null, 1).then((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        this.setState({
          currentData: data,
        });
      }
    });

    getSignalsLatestSingle(['RAD_TEMP', 'ANTENNA_DEPLOYED', 'LION_1_CHARGED',
                            'LION_2_CHARGED', 'LIFEPO4_B1_CHARGED', 'LIFEPO4_B2_CHARGED',
                            'FIRST_FLASH', 'PROG_MEM_REWRITTEN']).then((res) => {
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
          <p>Misc Information</p>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            <h4>{this.state.currentData.time_to_flash}</h4>
            <p className="caption">Time to next flash</p>
          </div>
          <div className="col-4 graphCard">
            <h4>{this.state.currentData.boot_count}</h4>
            <p className="caption">Reboot count</p>
            <h4 style={{marginTop: '30px'}}>{this.state.data.RAD_TEMP} C</h4>
            <p className="caption">Radio Temperature</p>
          </div>
          <div className="col-4 graphCard">
            <h4>{this.state.currentData.PANELREF / 1000} V</h4>
            <p className="caption">Solar Panel Voltage</p>
          </div>
        </div>
        <div className="subtitle white" style={{marginTop: '100px'}}>
          <p>Satellite Event History</p>
        </div>
        <div className="row">
          <div className="col-4 graphCard">
            <h4>
              {this.state.data.ANTENNA_DEPLOYED ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">Antenna Deployed</p>
          </div>
          <div className="col-4 graphCard">
            <h4>
              {this.state.data.LION_1_CHARGED ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">LiOn Battery #1 charged</p>
          </div>
          <div className="col-4 graphCard">
            <h4>
              {this.state.data.LION_2_CHARGED ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">LiOn Battery #2 charged</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 graphCard">
            <h4>
              {this.state.data.LIFEPO4_B1_CHARGED ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">LiFePO Bank #1 charged</p>
          </div>
          <div className="col-3 graphCard">
            <h4>
              {this.state.data.LIFEPO4_B2_CHARGED ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">LiFePO Bank #2 charged</p>
          </div>
          <div className="col-3 graphCard">
            <h4>
              {this.state.data.FIRST_FLASH ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">First flash</p>
          </div>
          <div className="col-3 graphCard">
            <h4>
              {this.state.data.PROG_MEM_REWRITTEN ?
                <i className="far fa-check-circle elem-4"></i> :
                <i className="far fa-times-circle elem-1"></i>
              }
            </h4>
            <p className="caption">Program memory rewritten</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataMisc;
