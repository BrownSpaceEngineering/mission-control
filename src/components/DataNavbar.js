import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/DataNavbar.css';

class DataPage extends Component {

  render() {
    return (
      <div className="data-navbar">
        <ul className="nav flex-column">
          <li className="nav-item text">
            Navigation
          </li>
          <li className={`nav-item ${this.props.active === 'current-data' && 'active'}`}>
            <Link to="/data" className="nav-link">Current Data</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'preamble' && 'active'}`}>
            <Link className="nav-link" to="/data/preamble">Preamble</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'idle-data' && 'active'}`}>
            <Link className="nav-link" to="/data/idle">Idle Data</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'attitude' && 'active'}`}>
            <Link className="nav-link" to="/data/attitude">Attitude</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'flash-burst' && 'active'}`}>
            <Link className="nav-link" to="/data/flash-burst">Flash Burst</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'flash-comparison' && 'active'}`}>
            <Link className="nav-link" to="/data/flash-comparison">Flash Comparison</Link>
          </li>
          <li className={`nav-item ${this.props.active === 'low-power' && 'active'}`}>
            <Link className="nav-link" to="/data/low-power">Low Power</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DataPage;
