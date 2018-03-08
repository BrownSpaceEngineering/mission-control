import React, { Component } from 'react';

import style from './CesiumPage.css';
import RightBar from "./RightBar.js";
const Cesium = global.Cesium;

class CesiumPage extends Component {
  componentDidMount() {
    var viewer = new Cesium.Viewer('cesiumContainer', {
      shouldAnimate: true,
    });

    var scene = viewer.scene;

    var pathPosition = new Cesium.SampledPositionProperty();
    var entityPath = viewer.entities.add({
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
            })
        }
    });

    var camera = viewer.camera;
    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 5000.0);

    var entity = viewer.entities.add({
        name : "AA",
        position : position,
        model : {
            uri : '/cad/Heart.gltf',
        }
    });

    viewer.trackedEntity = entity;

    var clock = viewer.clock;
    var lastUpdated = clock.currentTime;
    clock.onTick.addEventListener(() => {
        var pos = entity.position._value;
        var cart = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pos);
        pos = Cesium.Cartesian3.fromRadians(cart.longitude + 0.000001, cart.latitude, cart.height);
        pathPosition.addSample(Cesium.JulianDate.now(), pos);
        entity.position = pos;
    });
  }

  render() {
    return (
      <div className={style.pageContainer}>
        <div className={style.cesium} id="cesiumContainer" ref={element => (this.cesiumContainer = element)} />
        <RightBar />
      </div>
    );
  }

}


export default CesiumPage;
