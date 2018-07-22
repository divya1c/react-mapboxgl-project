import React, { Component } from 'react';
import './App.css';
import PlatformMap from './oneconcern_mapping/PlatformMap';

class BaseMap extends Component {
  componentDidMount() {
    const platformMap = new PlatformMap(this.mapContainer, 11, 6, 18, [-110.982309, 32.229371]);
    this.props.setMap(platformMap);
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="map"/>
    );
  }
}

export default BaseMap;
