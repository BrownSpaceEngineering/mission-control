import React, { Component } from 'react';

import style from './CesiumPage.css';
const Cesium = global.Cesium;

class CesiumPage extends Component {
  componentDidMount() {
    var viewer = new Cesium.Viewer('cesiumContainer', {
      shouldAnimate : true
    });

    var scene = viewer.scene;

    var pathPosition = new Cesium.SampledPositionProperty();
    var entityPath = viewer.entities.add({
        position: pathPosition,
        name: 'path',
        path: {
            show: true,
            leadTime: 0,
            trailTime: 60,
            width: 10,
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.3,
                color: Cesium.Color.PALEGOLDENROD
            })
        }
    });

    let x = 0;
    let y = 0;
    let z = 0;

    var camera = viewer.camera;
    var controller = scene.screenSpaceCameraController;
    var r = 0;
    var center = new Cesium.Cartesian3(0, 0, 0);

    var hpRoll = new Cesium.HeadingPitchRoll();
    var hpRange = new Cesium.HeadingPitchRange();
    var speed = 5000;
    var deltaRadians = Cesium.Math.toRadians(3.0);

    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 5000.0);
    var speedVector = new Cesium.Cartesian3();
    var fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');

    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(x, y, z));
    var model = scene.primitives.add(Cesium.Model.fromGltf({
        url : '/cad/Heart.gltf',
        modelMatrix : Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransform),
        scale : 256
    }));

    model.readyPromise.then(function(model) {
        // Play and loop all animations at half-speed
        model.activeAnimations.addAll({
            speedup : 0.5,
            loop : Cesium.ModelAnimationLoop.REPEAT

        });

        // Zoom to model
        r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);
        controller.minimumZoomDistance = r * 0.5;
        Cesium.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center, center);
        var heading = Cesium.Math.toRadians(230.0);
        var pitch = Cesium.Math.toRadians(-20.0);
        hpRange.heading = heading;
        hpRange.pitch = pitch;
        hpRange.range = r * 50.0;
        camera.lookAt(center, hpRange);
    });

    viewer.scene.preUpdate.addEventListener(function(scene, time) {
        speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X, speed / 10, speedVector);
        position = Cesium.Matrix4.multiplyByPoint(model.modelMatrix, speedVector, position);
        pathPosition.addSample(Cesium.JulianDate.now(), position);
        Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransform, model.modelMatrix);        
    });

  }

  render() {
    return (
      <div className={style.pageContainer}>
        <div className={style.cesium} id="cesiumContainer" ref={element => (this.cesiumContainer = element)} />
      </div>
    );
  }

}


export default CesiumPage;