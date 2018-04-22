import React, { Component } from 'react';

import style from './CesiumPage.css';
import RightBar from './RightBar.js';
import Controls from './Controls.js';
const Cesium = global.Cesium;

class CesiumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Cesium.BingMapsApi.defaultKey = 'AoB0m6xdYV5QFN7G597_nodN55DfzuUyr-7-' +
                                    'jjBSUSB1dea5LZPLNIBeIJYfB-59';

    const viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      shouldAnimate: true,
      timeline: false,
      fullscreenButton: false,
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

    let velocityV;
    let velocityM;

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
          uri: '/cad/model.gltf',
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
        <style
          dangerouslySetInnerHTML={{ __html: '.cesium-viewer-toolbar { right: 25vw }' }}
        />
        <div className={style.cesium} id="cesiumContainer" ref={element => (this.cesiumContainer = element)} />
        {this.state.viewer &&
          <Controls scene={this.state.viewer.scene} />
        }
        <RightBar />
      </div>
    );
  }
}

export default CesiumPage;
