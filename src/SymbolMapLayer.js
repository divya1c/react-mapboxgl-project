import React, { Component } from 'react';
import './App.css';

class SymbolMapLayer extends Component {
  componentDidMount() {
    if (this.props.map === undefined) return;
    let source = undefined;
    if (this.srcType === 'geojson') {
      source = this.props.map.getFeatureCollection('Point', this.props.srcCoordinatesArray, this.props.srcProperties);
    }
    this.props.map.addSourceWithGeojson('markersSource', source);
    const layerConfig = this.props.config.setLayerId('markers').setSourceId('markersSource');
    this.props.map.addLayer(layerConfig, 'symbol');
  }

  render() {
    return (null);
  }
}

export default SymbolMapLayer;