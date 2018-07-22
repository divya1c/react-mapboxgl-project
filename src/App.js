import React, { Component } from 'react';
import './App.css';
import PlatformMap from './oneconcern_mapping/PlatformMap';
import SymbolLayerConfig from './oneconcern_mapping/SymbolLayerConfig';
import LeftSideBar from './LeftSideBar';

class App extends Component {
  map;

  constructor(props) {
    super(props);
    this.state = {
      infrastructure: [{name: "Hello"}]
    };
  }

  mapOnLoad() {
    let coordinatesArray = [[-110.855590, 32.154922]];
    let properties = [{"name": "Davis Monthan Air Force Base", "category": "airfield"}];
    this.setState({infrastructure: properties});
    let source = this.map.getFeatureCollection('Point', coordinatesArray, properties);
    this.map.addSourceWithGeojson('markersSource', source);
    let markersConfig = new SymbolLayerConfig()
                          .setLayerId('markers')
                          .setSourceId('markersSource')
                          .setIconImage('{category}-15')
                          .setTextField('{name}')
                          .setTextSize(10)
                          .setTextColor('red')
                          .setTextTransform('uppercase')
                          .setTextHaloColor('#FFFFFF')
                          .setTextHaloWidth(2)
                          .setTextTranslate([0, 12])
                          .setTextAnchor('top');
    this.map.addLayer(markersConfig, 'symbol');
  }

  componentDidMount() {
    let platformMap = new PlatformMap(this.mapContainer, 11, 6, 18, [-110.982309, 32.229371]);
    this.map = platformMap;
    this.map.map.on('load', () => {
      this.mapOnLoad();
    }); 
  }
  
  render() {
    const infrastructure = this.state.infrastructure;
    return (
      <div>
        <LeftSideBar infrastructure={infrastructure}/>
        <div ref={el => this.mapContainer = el} className="map"/>
      </div>
    );
  }
}

export default App;
