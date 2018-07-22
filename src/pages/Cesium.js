import React, { Component } from 'react';
import TLEJS from 'tle.js';
import geocoder from 'geocoder';
import {geolocated} from 'react-geolocated';
import MediaQuery from 'react-responsive';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import Preamble from '../components/Preamble';
import CurrentData from '../components/CurrentData';
import TrackingData from '../components/TrackingData';
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
import ScreenSpaceEventType from "cesium/Source/Core/ScreenSpaceEventType"
import CesiumMath from "cesium/Source/Core/Math"
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin"

const tlejs = new TLEJS();

class CesiumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      longitude: 0,
      latitude: 0,
      altitude: 0,
      velocity: 0,
      viewer: null,
      entity: null,
      mapLayer: null,
      locked: true,
      homeLocation: {
        lon: null,
        lat: null,
        city: null,
      },
      pinLocation: {
        lon: null,
        lat: null,
        city: null,
      },
      pin: null,
      receivedGeolocation: false,
    };

    this.toggleLocked = this.toggleLocked.bind(this);
    this.setInitialPinLocation = this.setInitialPinLocation.bind(this);
  }

  tleStr = 'ISS (ZARYA)\n1 25544U 98067A   18167.57342809  .00001873  00000-0  35452-4 0  9993\n2 25544  51.6416  21.7698 0002962 191.5103 260.7459 15.54186563118420';

  setInitialPinLocation(viewer) {
    fetch('https://ipapi.co/json/').then((res) => {
      return res.json();
    }).then((res) => {
      const pin = viewer.entities.add({
        position : Cartesian3.fromDegrees(res.longitude, res.latitude),
        billboard : {
            image : '/pin.png',
            verticalOrigin : VerticalOrigin.BOTTOM
        }
      });

      this.setState({
        homeLocation: {
          lon: res.longitude,
          lat: res.latitude,
          city: res.city,
        },
        pin
      });
    });
  }

  toggleLocked() {
    if (this.state.locked) {
      this.state.viewer.trackedEntity = null;
      this.setState({
        locked: false,
      });
    } else {      
      const currentLoc = tlejs.getSatelliteInfo(this.tleStr, Date.now(), 0, 0, 0);
      const position = Cartesian3.fromDegrees(currentLoc.lng,
                                              currentLoc.lat,
                                              currentLoc.height * 1000);
      this.state.viewer.camera.lookAt(position, new Cartesian3(0.0, 0.0, 15000000.0));
      this.state.viewer.trackedEntity = this.state.entity;
      this.setState({
        locked: true,
      });
    }
  }

  componentDidMount() {
    fetch('http://tracking.brownspace.org/api/equisat_tle').then((res) => {      
      if (res.status === 200) {        
        res.text().then((res) => {
          this.tleStr = res;
        });
      }
    });
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

    // Set pin
    this.setInitialPinLocation(viewer);
    const timer = setInterval(() => {
      if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled &&
        this.props.coords && !this.state.receivedGeolocation && this.state.pin) {
        this.state.pin.position = Cartesian3.fromDegrees(this.props.coords.longitude, this.props.coords.latitude);
        this.setState({
          receivedGeolocation: true,
          homeLocation: {
            lon: this.props.coords.longitude,
            lat: this.props.coords.latitude,
            city: this.state.homeLocation.city
          }
        });
        clearInterval(timer);
      }
    }, 1000);

    // Set map layers
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
    
    const orbitLines = tlejs.getGroundTrackLngLat(this.tleStr, 5000);
    let currentLoc = tlejs.getLatLon(this.tleStr);

    for (let i = 0; i < orbitLines[1].length; i++) {
      const each = orbitLines[1][i]
      const position = Cartesian3.fromDegrees(each[0], each[1], 400 * 1000);
      pathPosition.addSample(JulianDate.now(), position);
      /*if (Math.sqrt(Math.pow((each[0] - currentLoc.lng), 2) + Math.pow((each[1] - currentLoc.lat), 2)) < 1) {
        break;
      }*/
    }

    // Fetch position area
    currentLoc = tlejs.getSatelliteInfo(this.tleStr, Date.now(), 0, 0, 0);
    const position = Cartesian3.fromDegrees(currentLoc.lng,
                                            currentLoc.lat,
                                            currentLoc.height * 1000);
    //pathPosition.addSample(JulianDate.now(), position);

    const entity = viewer.entities.add({
      position,
      model: {
        uri: '/cad/sat.gltf',
        scale: 100,
        minimumPixelSize: 100,
        maximumScale: 10000000,
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
      const currentLoc = tlejs.getSatelliteInfo(this.tleStr, Date.now(), 0, 0, 0);
      const position = Cartesian3.fromDegrees(currentLoc.lng,
                                               currentLoc.lat,
                                               currentLoc.height * 1000);
      //pathPosition.addSample(JulianDate.now(), position);
      entity.position = position;
      if (this.state.locked) {
        viewer.trackedEntity = entity;
      }

      this.setState({
        longitude: currentLoc.lng,
        latitude: currentLoc.lat,
        altitude: currentLoc.height,
        velocity: currentLoc.velocity,
      });
    }, 1000);

    // Left click event handler
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
      const ellipsoid = viewer.scene.globe.ellipsoid;
      const cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
      if (cartesian && this.state.pin) {
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        let lon = CesiumMath.toDegrees(cartographic.longitude);
        let lat = CesiumMath.toDegrees(cartographic.latitude);

        // Weirdo bug with 2D. Coordinates returned are relative to the satellite.
        if (viewer.scene.mode === SceneMode.SCENE2D && this.state.locked === true) {
          lon = this.state.longitude + lon;
          lat = this.state.latitude + lat;
        }

        const position = Cartesian3.fromDegrees(lon, lat);
        this.state.pin.position = position;
        geocoder.reverseGeocode(lat, lon, (err, data) => {
          console.log(data);
          let city;
          if (data.results.length === 0) {
            city = '';
          } else {
            if (data.results.length < 2) {
              city = data.results[0].formatted_address;
            } else {
              city = data.results[1].formatted_address;
            }
            city = city.substr(0, city.lastIndexOf(","));
          }
          console.log(city);
          this.setState({
            pinLocation: {
              city,
              lat,
              lon
            }
          });
        });
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
  }

  render() {
    return (
      <div className='cesiumPage'>
        { this.state.loaded ? '' : <div className="overlay"></div> }
        <div className={`pageContainer ${this.state.loaded ? '' : 'notLoaded'}`} >
          {this.state.viewer && this.state.entity &&
            <Controls
              viewer={this.state.viewer}
              entity={this.state.entity}
              mapLayer={this.state.mapLayer}
              toggleLocked={this.toggleLocked}
              locked={this.state.locked}
            />
          }
          <MediaQuery query="(min-width: 769px)">
            <Navigation active='missioncontrol' />
          </MediaQuery>
          <MediaQuery query="(max-width: 769px)">
            <NavigationMobile active='missioncontrol' />
          </MediaQuery>          
          <div className='rightBar'>
            <TrackingData
              lon={this.state.longitude}
              lat={this.state.latitude}
              alt={this.state.altitude}
              velocity={this.state.velocity}
              homeLocation={this.state.homeLocation}
              pinLocation={this.state.pinLocation}
            />
          </div>
          <div id="cesiumContainer"></div>
        </div>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 20000,
})(CesiumPage);
