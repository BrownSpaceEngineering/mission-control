import React, { Component } from 'react';

import style from './CesiumPage.css';
const Cesium = global.Cesium;

class CesiumPage extends Component {
  componentDidMount() {
    this.viewer = new Cesium.Viewer(this.cesiumContainer, {
      timeline: false,
      animation: false,
      fullscreenButton: false,
    });
  }

  render() {
    return (
      <div className={style.pageContainer}>
        <div className={style.cesium} id="cesiumContainer" ref={element => (this.cesiumContainer = element)} />
      </div>
    );
  }

}


export default CesiumPage;
