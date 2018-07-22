import React, { Component } from 'react';
import './App.css';
import PlatformMap from './oneconcern_mapping/PlatformMap';

class Map extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      map: props.map
    };
  }

  componentDidMount() {
    let map = new PlatformMap(this.mapContainer, 11, 6, 18, [-110.982309, 32.229371]);
  }
  
  render() {
    return (
      <div ref={el => this.mapContainer = el} className="map"/>
    );
  }
}

export default Map;
