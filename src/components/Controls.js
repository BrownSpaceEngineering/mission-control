import React, { Component } from 'react';

import '../assets/Controls.css';
import button2D from '../assets/images/2d-button.png';
import button3D from '../assets/images/3d-button.png';

import SceneMode from "cesium/Source/Scene/SceneMode";

class Controls extends Component {
  render() {
    return (
      <div className='controls'>
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
          this.props.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 15000000;
          this.props.viewer.trackedEntity = this.props.entity;
          setTimeout(() => {
            this.props.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
          }, 1000);
        }}
        className='button'
        >
          2D
        </button>
        <button
          onClick={() => {
            this.props.viewer.scene.mode = SceneMode.SCENE3D;
            this.props.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 15000000;
            this.props.viewer.trackedEntity = this.props.entity;
            setTimeout(() => {
              this.props.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
            }, 1000);
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
