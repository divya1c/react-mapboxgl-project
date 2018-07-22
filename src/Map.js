import React, { Component } from 'react';
import './App.css';
import SymbolLayerConfig from './oneconcern_mapping/SymbolLayerConfig';
import BaseMap from './BaseMap';
import SymbolMapLayer from './SymbolMapLayer';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: undefined
    };
    this.setMap=this.setMap.bind(this);
  }

  setMap(map) {
    const changedMap = map;
    this.setState({map: changedMap}, () => {
      console.log(this.state.map);
    });
  }
  
  render() {
    const map = this.state.map;
    const sLayerConfig = new SymbolLayerConfig()
                          .setIconImage('{category}-15')
                          .setTextField('{name}')
                          .setTextSize(10)
                          .setTextColor('red')
                          .setTextTransform('uppercase')
                          .setTextHaloColor('#FFFFFF')
                          .setTextHaloWidth(2)
                          .setTextTranslate([0, 12])
                          .setTextAnchor('top');
    const srcCoordinatesArray = [[-110.855590, 32.154922]];
    const srcProperties = [{"name": "Davis Monthan Air Force Base", "category": "airfield"}];
    return (
      <div>
        <BaseMap setMap={this.setMap}/>
        <SymbolMapLayer map={map} 
                        setMap={this.setMap} 
                        config={sLayerConfig}
                        srcCoordinatesArray={srcCoordinatesArray}
                        srcProperties={srcProperties}
                        srcType='geojson'/>
      </div>
    );
  }
}

export default Map;
