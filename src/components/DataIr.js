import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

import * as params from '../utils/chartjs_params';

// import 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';

class DataIr extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    getSignalsLatestSingle(['IR_FLASH_AMB', 'IR_SIDE1_AMB', 'IR_SIDE2_AMB',
                            'IR_RBF_AMB', 'IR_ACCESS_AMB', 'IR_TOP1_AMB',
                            'IR_FLASH_OBJ', 'IR_SIDE1_OBJ', 'IR_SIDE2_OBJ',
                            'IR_RBF_OBJ', 'IR_ACCESS_OBJ', 'IR_TOP1_OBJ']).then((res) => {
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
          <p>Panel Sensors</p>
        </div>
        <div className="row">
          <div className="col-6 graphCard">
            <h3 className="statTitle">Ambient Temperature</h3>
            <div className="graph grid">
              <div>
                <h4 className="elem-1">{this.state.data.IR_FLASH_AMB} C</h4>
                <p className="caption">Flash Panel</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.data.IR_SIDE1_AMB} C</h4>
                <p className="caption">Side Panel 1</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.data.IR_SIDE2_AMB} C</h4>
                <p className="caption">Side Panel 2</p>
              </div>
              <div>
                <h4 className="elem-4">{this.state.data.IR_RBF_AMB} C</h4>
                <p className="caption">RBF Panel</p>
              </div>
              <div>
                <h4 className="elem-6">{this.state.data.IR_ACCESS_AMB} C</h4>
                <p className="caption">Access Panel</p>
              </div>
              <div>
                <h4 className="elem-7">{this.state.data.IR_TOP1_AMB} C</h4>
                <p className="caption">Top Panel</p>
              </div>
            </div>
          </div>
          <div className="col-6 graphCard">
            <h3 className="statTitle">Object Temperature</h3>
            <div className="graph grid">
              <div>
                <h4 className="elem-1">{this.state.data.IR_FLASH_OBJ} C</h4>
                <p className="caption">Flash Panel</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.data.IR_SIDE1_OBJ} C</h4>
                <p className="caption">Side Panel 1</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.data.IR_SIDE2_OBJ} C</h4>
                <p className="caption">Side Panel 2</p>
              </div>
              <div>
                <h4 className="elem-4">{this.state.data.IR_RBF_OBJ} C</h4>
                <p className="caption">RBF Panel</p>
              </div>
              <div>
                <h4 className="elem-6">{this.state.data.IR_ACCESS_OBJ} C</h4>
                <p className="caption">Access Panel</p>
              </div>
              <div>
                <h4 className="elem-7">{this.state.data.IR_TOP1_OBJ} C</h4>
                <p className="caption">Top Panel</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataIr;
