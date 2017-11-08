import React, { Component } from 'react';

import style from './CesiumPage.css';
const Cesium = global.Cesium;

class CesiumPage extends Component {
  componentDidMount() {
    this.viewer = new Cesium.Viewer(this.cesiumContainer);
  }

  render() {
    return (
      <div className={style.pageContainer}>
        <div className={style.cesium} id="cesiumContainer" ref={ element => this.cesiumContainer = element } />
      </div>
    );
  }

}

// class CesiumPage extends Component {
//   render() {
//     return (
//       <div>
//       </div>
//     );
//   }

// }


export default CesiumPage;
