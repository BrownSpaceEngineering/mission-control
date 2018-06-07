import React, { Component } from 'react';

import '../assets/Controls.css';
import button2D from '../assets/images/2d-button.png';
import button3D from '../assets/images/3d-button.png';

import SceneMode from "cesium/Source/Scene/SceneMode";

class Controls extends Component {
  render() {
    return (
      <div className='controls'>
        <button onClick={() => {this.props.scene.mode = SceneMode.SCENE2D; }}   className='button'>
          <img src={button2D} alt="2D" className='buttonImage' />
        </button>
        <button onClick={() => {this.props.scene.mode = SceneMode.SCENE3D; }} className='button'>
          <img src={button3D} alt="3D" className='buttonImage' />
        </button>
      </div>
    );
  }
}

export default Controls;
