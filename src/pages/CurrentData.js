import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import scrollToComponent from 'react-scroll-to-component';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import DataNavbar from '../components/DataNavbar';

import DataPreamble from '../components/DataPreamble';
import DataLionBattery from '../components/DataLionBattery';
import DataLiFePoBattery from '../components/DataLiFePoBattery';
import DataLed from '../components/DataLed';
import DataIr from '../components/DataIr';
import DataImu from '../components/DataImu';
import DataPhotodiode from '../components/DataPhotodiode';
import DataMisc from '../components/DataMisc';
import '../assets/Data.css';

import Chart from 'chart.js';

class DataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentData: {},
      lifepoData: {}
    };

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  componentDidMount() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
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
      } else if (anchor === 'photodiode') {
        scrollComponent = this.photodiode;
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
          <h2>Current Data</h2>
          <div className="break">
            <hr />
          </div>
          <DataPreamble ref={(section) => { this.preamble = section; }}/>
          <DataLionBattery ref={(section) => { this.lion = section; }} />
          <DataLiFePoBattery ref={(section) => { this.lifepo = section; }} />
          <DataLed ref={(section) => { this.led = section; }} />
          <DataIr ref={(section) => { this.ir = section; }} />
          <DataImu ref={(section) => { this.imu = section; }} />
          <DataPhotodiode ref={(section) => { this.photodiode = section; }} />
          <DataMisc ref={(section) => { this.misc = section; }} />
        </div>
      </div>
    );
  }
}

export default DataPage;
