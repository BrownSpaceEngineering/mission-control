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
        leadTime: 0,
        trailTime: 600000,
        width: 10,
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.3,
          color: Cesium.Color.PALEGOLDENROD,
        }),
      },
    });

    const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 400000.0);

    const entity = viewer.entities.add({
      name: 'AA',
      position,
      model: {
        uri: '/cad/Heart.gltf',
        scale: 10,
      },
    });

    viewer.trackedEntity = entity;

    this.setState({
      viewer
    });

    const clock = viewer.clock;
    clock.onTick.addEventListener(() => {
      let pos = entity.position._value;
      const cart = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pos);
      pos = Cesium.Cartesian3.fromRadians(cart.longitude + 0.0001, cart.latitude, cart.height);
      pathPosition.addSample(Cesium.JulianDate.now(), pos);
      entity.position = pos;
      viewer.trackedEntity = entity;
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
