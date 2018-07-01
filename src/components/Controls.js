import React, { Component } from 'react';
import TLEJS from 'tle.js';
import Cartesian3 from "cesium/Source/Core/Cartesian3";

import '../assets/Controls.css';

import SceneMode from "cesium/Source/Scene/SceneMode";

class Controls extends Component {

  render() {
    return (
      <div className='controls'>
      <button
        onClick={this.props.toggleLocked}
        className='button'
        >
          Toggle
        </button>
        <button
        onClick={() => {
          this.props.mapLayer.alpha = 1;
        }}
        className='button'
        >
          Map
        </button>
        <button
          onClick={() => {
            this.props.mapLayer.alpha = 0;
          }}
          className='button'
        >
          Satellite
        </button>
        <button
        onClick={() => {
          this.props.viewer.scene.mode = SceneMode.SCENE2D;
          if (this.props.locked) {
            const tlejs = new TLEJS();
            const tleStr = 'ISS (ZARYA)\n1 25544U 98067A   18167.57342809  .00001873  00000-0  35452-4 0  9993\n2 25544  51.6416  21.7698 0002962 191.5103 260.7459 15.54186563118420';
            const currentLoc = tlejs.getSatelliteInfo(tleStr, Date.now(), 0, 0, 0);
            const position = Cartesian3.fromDegrees(currentLoc.lng,
                                                    currentLoc.lat,
                                                    currentLoc.height * 1000);
            this.props.viewer.camera.lookAt(position, new Cartesian3(0.0, 0.0, 15000000.0));
            this.props.viewer.trackedEntity = this.props.entity;
          }
        }}
        className='button'
        >
          2D
        </button>
        <button
          onClick={() => {
            this.props.viewer.scene.mode = SceneMode.SCENE3D;
            if (this.props.locked) {
              this.props.viewer.trackedEntity = this.props.entity;
            }
          }}
          className='button'
        >
          3D
        </button>
      </div>
    );
  }
}

export default Controls;
