import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import scrollToComponent from 'react-scroll-to-component';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import DataNavbar from '../components/HistoricalDataNavbar';

import HistoryDataLed from '../components/HistoryDataLed';
import '../assets/Data.css';

import Chart from 'chart.js';

class HistoricalData extends Component {

  constructor(props) {
    super(props);

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(anchor) {
    return () => {
      let scrollComponent;
      if (anchor === 'preamble') {
        scrollComponent = this.preamble;
      } else if (anchor === 'lion') {
        scrollComponent = this.lion;
      } else if (anchor === 'lifepo') {
        scrollComponent = this.lifepo;
      } else if (anchor === 'led') {
        scrollComponent = this.led;
      } else if (anchor === 'ir') {
        scrollComponent = this.ir;
      } else if (anchor === 'imu') {
        scrollComponent = this.imu;
      } else if (anchor === 'misc') {
        scrollComponent = this.misc;
      }

      scrollToComponent(scrollComponent, { offset: -90, align: 'top', duration: 1000, ease: 'inOutSine'});
    }
  }

  render() {
    return (
      <div className="dataPage row">
        <MediaQuery query="(min-width: 769px)">
          <Navigation active='data' />
        </MediaQuery>
        <MediaQuery query="(max-width: 769px)">
          <NavigationMobile active='data' />
        </MediaQuery>
        <div className="col-2">
          <DataNavbar
            scrollToSection={this.scrollToSection}
          />
        </div>
        <div className="dataContainer col-10">
          <h2>Historical Data</h2>
          <div className="break">
            <hr />
          </div>
          <h3>Coming Soon</h3>
          <HistoryDataLed />
        </div>
      </div>
    );
  }
}

export default HistoricalData;
