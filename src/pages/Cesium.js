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
      sceneModePicker: false
    });

    this.setState({
      viewer,
    });

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
                                              result.altitude);

      const entity = viewer.entities.add({
        name: 'AA',
        position,
        model: {
          uri: '/cad/sat.gltf',
          scale: 100,
          minimumPixelSize: 100,
        },
      });

      viewer.trackedEntity = entity;

      setInterval(() => {
        fetch('http://35.192.71.2:3000/api/get_lonlatalt/ISS%20(ZARYA)').then((result2) => {
          return result2.json();
        }).then((result2) => {
          const position2 = Cartesian3.fromDegrees(result2.longitude,
                                                   result2.latitude,
                                                   result2.altitude);
          pathPosition.addSample(JulianDate.now(), position2);
          entity.position = position2;
          viewer.trackedEntity = entity;
        });
      }, 1000);
    });
  }

  render() {
    return (
      <div className="pageContainer">
        { this.state.loaded ? '' : <div className="overlay"></div> }
        {this.state.viewer &&
          <Controls scene={this.state.viewer.scene} />
        }
        <Navigation active='missioncontrol' />
        <Preamble />
        <CurrentData />
        <TrackingData />
        <Equisat />
        <div id="cesiumContainer"></div>
      </div>
    );
  }
}

export default CesiumPage;
