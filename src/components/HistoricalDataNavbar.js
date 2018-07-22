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
            <Link
              to='/data'
              className="nav-link element"
            >Last Transmission</Link>
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
