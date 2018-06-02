import React, { Component } from 'react';

import style from './CesiumPage.css';
import Navigation from './Navigation.js';
import Preamble from './Preamble.js';
import CurrentData from './CurrentData.js';
import TrackingData from './TrackingData.js';
import EQUiSat from './EQUiSat.js';
import Controls from './Controls.js';
const Cesium = global.Cesium;

class CesiumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("Loaded");
      this.setState({
        loaded: true,
      });
    }, 3000);

    Cesium.BingMapsApi.defaultKey = 'AoB0m6xdYV5QFN7G597_nodN55DfzuUyr-7-' +
                                    'jjBSUSB1dea5LZPLNIBeIJYfB-59';

    const viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      shouldAnimate: true,
      timeline: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false

    });

    this.setState({
      viewer,
    });

    // viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    const pathPosition = new Cesium.SampledPositionProperty();
    viewer.entities.add({
      position: pathPosition,
      name: 'path',
      path: {
        show: true,
        leadTime: 60000,
        trailTime: 60000,
        width: 10,
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.3,
          color: Cesium.Color.PALEGOLDENROD,
        }),
      },
    });

    fetch('http://35.192.71.2:3000/api/get_lonlatalt/ISS%20(ZARYA)').then((result) => {
      return result.json();
    }).then((result) => {
      const position = Cesium.Cartesian3.fromDegrees(result.longitude,
                                                     result.latitude,
                                                     result.altitude);

      const entity = viewer.entities.add({
        name: 'AA',
        position,
        model: {
          uri: '/cad/small_sat.gltf',
          scale: 1,
        },
      });

      viewer.trackedEntity = entity;

      setInterval(() => {
        fetch('http://35.192.71.2:3000/api/get_lonlatalt/ISS%20(ZARYA)').then((result2) => {
          return result2.json();
        }).then((result2) => {
          const position2 = Cesium.Cartesian3.fromDegrees(result2.longitude,
                                                         result2.latitude,
                                                         result2.altitude);
          pathPosition.addSample(Cesium.JulianDate.now(), position2);
          entity.position = position2;
          viewer.trackedEntity = entity;
        });
      }, 1000);
    });
  }

  render() {
    return (
      <div className={style.pageContainer}>
        { this.state.loaded ? <div></div> : <div className={style.overlay}></div> }
        <style
          dangerouslySetInnerHTML={{ __html: '.cesium-viewer-toolbar { visibility: hidden }' }}
        />
        <div className={style.cesium} id="cesiumContainer" ref={element => (this.cesiumContainer = element)} />
        {this.state.viewer &&
          <Controls scene={this.state.viewer.scene} />
        }
        <Navigation active='missioncontrol' />
        <Preamble />
        <CurrentData />
        <TrackingData />
        <EQUiSat />
      </div>
    );
  }
}

export default CesiumPage;
