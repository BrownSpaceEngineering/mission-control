import React, { Component } from 'react';

import { getSignalsLatestSingle } from '../utils/EQUiSatAPI';
import '../assets/Data.css';

class DataPhotodiode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    getSignalsLatestSingle(['PD_TOP1', 'PD_SIDE1', 'PD_SIDE2',
                            'PD_TOP2', 'PD_ACCESS', 'PD_FLASH']).then((res) => {
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
          <p>Photodiodes</p>
        </div>
        <div className="row">
          <div className="col-12 graphCard">
            <div className="graph grid-3">
              <div>
                <h4 className="elem-1">{this.state.data.PD_FLASH}</h4>
                <p className="caption">Flash Panel</p>
              </div>
              <div>
                <h4 className="elem-2">{this.state.data.PD_SIDE1}</h4>
                <p className="caption">Side Panel 1</p>
              </div>
              <div>
                <h4 className="elem-3">{this.state.data.PD_SIDE2}</h4>
                <p className="caption">Side Panel 2</p>
              </div>
              <div>
                <h4 className="elem-4">{this.state.data.PD_TOP2}</h4>
                <p className="caption">Top Panel 1</p>
              </div>
              <div>
                <h4 className="elem-7">{this.state.data.PD_TOP1}</h4>
                <p className="caption">Top Panel 2</p>
              </div>
              <div>
                <h4 className="elem-6">{this.state.data.PD_ACCESS}</h4>
                <p className="caption">Access Panel</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DataPhotodiode;
