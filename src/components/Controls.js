import React, { Component } from 'react';
import TLEJS from 'tle.js';
import Switch from 'react-switch';

import '../assets/Controls.css';

import Cartesian3 from "cesium/Source/Core/Cartesian3";
import SceneMode from "cesium/Source/Scene/SceneMode";

class Controls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapChecked: false,
      threeDimensionChecked: false,
    };

    this.onChangeDimension = this.onChangeDimension.bind(this);
    this.onChangeMapLayer = this.onChangeMapLayer.bind(this);
  }

  onChangeDimension(value) {
    if (value) {
      this.props.viewer.scene.mode = SceneMode.SCENE3D;
      if (this.props.locked) {
        this.props.viewer.trackedEntity = this.props.entity;
      }
    } else {
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
    }
    this.setState({
      threeDimensionChecked: value,
    });
  }

  onChangeMapLayer(value) {
    if (value) {
      console.log("changing maplayer");
      this.props.mapLayer.alpha = 1;
    } else {
      this.props.mapLayer.alpha = 0;
    }
    this.setState({
      mapChecked: value,
    });
  }

  render() {
    return (
      <div className='controls'>
        <div className='labels'>
          Lock to satellite
        </div>
        <Switch
          onChange={this.props.toggleLocked}
          checked={this.props.locked}
        />
        <div className='labels'>
          Map layer
        </div>
        <Switch
          onChange={this.onChangeMapLayer}
          checked={this.state.mapChecked}
        />
        <div className='labels'>
          3D View
        </div>
        <Switch
          onChange={this.onChangeDimension}
          checked={this.state.threeDimensionChecked}
        />
      </div>
    );
  }
}

export default Controls;
