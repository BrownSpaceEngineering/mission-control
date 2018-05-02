import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import style from './CesiumPage.css';
const Cesium = global.Cesium;

import button2D from '../../../../public/images/2d-button.png';
import button3D from '../../../../public/images/3d-button.png';
import buttonCAD from '../../../../public/images/logo-button.png';
import buttonData from '../../../../public/images/data-button.png';



class Controls extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className={style.Controls}>
        <Button onClick={() => {this.props.scene.mode = Cesium.SceneMode.SCENE2D; }}   className={style.button}>
          <img src={button2D} alt="2D" className={style.buttonImage} />
          <button ></button>
        </Button>
        <Button onClick={() => {this.props.scene.mode = Cesium.SceneMode.SCENE3D; }} className={style.button} active>
          <img src={button3D} alt="3D"     className={style.buttonImage} />
        </Button>
      </div>
    );
  }
}

export default Controls;
