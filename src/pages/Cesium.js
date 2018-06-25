import React, { Component } from 'react';
import TLEJS from 'tle.js';

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
      longitude: 0,
      latitude: 0,
      altitude: 0,
      velocity: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 3000);

    // Loading viewer and map layers
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
    mapLayer.alpha = 0;
    viewer.scene.mode = SceneMode.SCENE2D;

    // Fetch path area
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
          color: Color.CORNFLOWERBLUE,
        }),
      },
    });

    const tlejs = new TLEJS();
    const tleStr = 'ISS (ZARYA)\n1 25544U 98067A   18167.57342809  .00001873  00000-0  35452-4 0  9993\n2 25544  51.6416  21.7698 0002962 191.5103 260.7459 15.54186563118420';
    const orbitLines = tlejs.getGroundTrackLngLat(tleStr, 5000);
    let currentLoc = tlejs.getLatLon(tleStr);

    for (let i = 0; i < orbitLines[1].length; i++) {
      const each = orbitLines[1][i]
      const position = Cartesian3.fromDegrees(each[0], each[1], 400 * 1000);
      pathPosition.addSample(JulianDate.now(), position);
      if (Math.sqrt(Math.pow((each[0] - currentLoc.lng), 2) + Math.pow((each[1] - currentLoc.lat), 2)) < 1) {
        break;
      }
    }

    // Fetch position area
    currentLoc = tlejs.getSatelliteInfo(tleStr, Date.now(), 0, 0, 0);
    const position = Cartesian3.fromDegrees(currentLoc.lng,
                                            currentLoc.lat,
                                            currentLoc.height * 1000);
    pathPosition.addSample(JulianDate.now(), position);

    const entity = viewer.entities.add({
      position,
      model: {
        uri: '/cad/sat.gltf',
        scale: 100,
        minimumPixelSize: 100,
      },
      viewFrom: new Cartesian3(0.0, 0.0, 15000000.0),
    });

    viewer.camera.lookAt(position, new Cartesian3(0.0, 0.0, 15000000.0));

    this.setState({
      viewer,
      entity,
      mapLayer,
      longitude: currentLoc.lng,
      latitude: currentLoc.lat,
      altitude: currentLoc.height,
      velocity: currentLoc.velocity,
    });

    setTimeout(() => {
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
    }, 3000);

    setInterval(() => {
      const currentLoc = tlejs.getSatelliteInfo(tleStr, Date.now(), 0, 0, 0);
      const position = Cartesian3.fromDegrees(currentLoc.lng,
                                               currentLoc.lat,
                                               currentLoc.height * 1000);
      pathPosition.addSample(JulianDate.now(), position);
      entity.position = position;
      viewer.trackedEntity = entity;

      this.setState({
        longitude: currentLoc.lng,
        latitude: currentLoc.lat,
        altitude: currentLoc.height,
        velocity: currentLoc.velocity,
      });
    }, 1000);
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
          <TrackingData
            lon={this.state.longitude}
            lat={this.state.latitude}
            alt={this.state.altitude}
            velocity={this.state.velocity}
          />
          <Equisat />
          <div id="cesiumContainer"></div>
        </div>
      </div>
    );
  }
}

export default CesiumPage;
