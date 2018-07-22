import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/DataNavbar.css';

class DataPage extends Component {

  render() {
    return (
      <div className="data-navbar">
        <ul className="nav flex-column">
          <li className="nav-item text">
            Latest Data
          </li>
          <li className={`nav-item ${this.props.active === 'preamble' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('preamble')}
              className="nav-link element"
            >Last Transmission</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('lion')}
              className="nav-link element"
            >LiOn Battery</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('lifepo')}
              className="nav-link element"
            >LiFePO Battery</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('led')}
              className="nav-link element"
            >LED</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('ir')}
              className="nav-link element"
            >Panel Sensors</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('imu')}
              className="nav-link element"
            >IMU</span>
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <span
              onClick={this.props.scrollToSection('misc')}
              className="nav-link element"
            >Misc</span>
          </li>
          <li className="nav-item text" style={{marginTop: '50px'}}>
            Historical Data
          </li>
          <li className={`nav-item ${this.props.active === 'preamble' && 'active'}`}>
            <Link to='/data/historical'
              className="nav-link element"
            >Overview</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'preamble' && 'active'}`}>
            <Link
              to='/data/historical/advanced'
              className="nav-link element"
            >Advanced</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DataPage;
