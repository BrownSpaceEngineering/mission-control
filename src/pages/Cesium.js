import React, { Component } from 'react';

import Navigation from '../components/Navigation';
import Preamble from '../components/Preamble';
import CurrentData from '../components/CurrentData';
import TrackingData from '../components/TrackingData';
import Equisat from '../components/EQUiSat';
import Controls from '../components/Controls';
import '../assets/Cesium.css';

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Ion from "cesium/Source/Core/Ion";
import SampledPositionProperty from "cesium/Source/DataSources/SampledPositionProperty";
import PolylineGlowMaterialProperty from "cesium/Source/DataSources/PolylineGlowMaterialProperty";
import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import JulianDate from "cesium/Source/Core/JulianDate";
import SceneMode from "cesium/Source/Scene/SceneMode";
import createOpenStreetMapImageryProvider from "cesium/Source/Scene/createOpenStreetMapImageryProvider"
import IonImageryProvider from "cesium/Source/Scene/IonImageryProvider";

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

    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                             'eyJqdGkiOiJmODc5NzI3ZS05NTQzLTQxNGEtO' +
                             'DQzNC1hNThkNjAxZTljZDYiLCJpZCI6MTQyMS' +
                             'wiaWF0IjoxNTI4MzQ1MjgyfQ.v5XboPB-rqWx' +
                             'CaAwpdInpFLDbi5wvZdKsPHpmtCUKOQ';

    const viewer = new Viewer('cesiumContainer', {
      animation: false,
      shouldAnimate: true,
      timeline: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
    });

    const mapLayer = viewer.scene.imageryLayers.addImageryProvider(new createOpenStreetMapImageryProvider({
        url : 'https://a.tile.openstreetmap.org/'
    }));
    viewer.scene.mode = SceneMode.SCENE2D;

    const pathPosition = new SampledPositionProperty();
    viewer.entities.add({
      position: pathPosition,
      name: 'path',
      path: {
        show: true,
        leadTime: 60000,
        trailTime: 60000,
        width: 10,
        resolution: 1,
        material: new PolylineGlowMaterialProperty({
          glowPower: 0.3,
          color: Color.PALEGOLDENROD,
        }),
      },
    });

    fetch('http://35.192.71.2:3000/api/get_lonlatalt/ISS%20(ZARYA)').then((result) => {
      return result.json();
    }).then((result) => {
      const position = Cartesian3.fromDegrees(result.longitude,
                                              result.latitude,
                                              result.altitude * 1000);

      const entity = viewer.entities.add({
        position,
        model: {
          uri: '/cad/sat.gltf',
          scale: 100,
          minimumPixelSize: 100,
        },
      });

      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 15000000;
      viewer.trackedEntity = entity;

      this.setState({
        viewer,
        entity,
        mapLayer
      });
      setTimeout(() => {
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
      }, 1000);

      setInterval(() => {
        fetch('http://35.192.71.2:3000/api/get_lonlatalt/ISS%20(ZARYA)').then((result2) => {
          return result2.json();
        }).then((result2) => {
          const position2 = Cartesian3.fromDegrees(result2.longitude,
                                                   result2.latitude,
                                                   result2.altitude * 1000);
          pathPosition.addSample(JulianDate.now(), position2);
          entity.position = position2;
          viewer.trackedEntity = entity;
        });
      }, 1000);
    });
  }

  render() {
    return (
      <div>
        { this.state.loaded ? '' : <div className="overlay"></div> }
        <div className={`pageContainer ${this.state.loaded ? '' : 'notLoaded'}`} >
          {this.state.viewer && this.state.entity &&
            <Controls
              viewer={this.state.viewer}
              entity={this.state.entity}
              mapLayer={this.state.mapLayer}
            />
          }
          <Navigation active='missioncontrol' />
          <Preamble />
          <CurrentData />
          <TrackingData />
          <Equisat />
          <div id="cesiumContainer"></div>
        </div>
      </div>
    );
  }
}

export default CesiumPage;
