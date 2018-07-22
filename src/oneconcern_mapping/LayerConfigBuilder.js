import PolygonLayerConfig from './PolygonLayerConfig';
import LineLayerConfig from './LineLayerConfig';
import CircleLayerConfig from './CircleLayerConfig';
import SymbolLayerConfig from './SymbolLayerConfig';

/** 
 * Class used to build map layer json for mapbox gl. 
 */
class LayerConfigBuilder {
  /**
   * Method that returns the appropriate instance according to the layer type
   * @param {string} layerType polygon/line/circle/symbol
   */
  static buildConfig(layerType) {
    if (layerType === 'polygon') {
      return new PolygonLayerConfig();
    } else if (layerType === 'line') {
      return new LineLayerConfig();
    } else if (layerType === 'circle') {
      return new CircleLayerConfig();
    } else if (layerType === 'symbol') {
      return new SymbolLayerConfig();
    }
  }

  /**
   * Method to build layer json from a config object
   * @param {PolygonLayerConfig | LineLayerConfig | CircleLayerConfig | SymbolLayerConfig} configObject 
   * @param {string} layerType polygon/line/circle/symbol
   */
  static buildLayerJson(configObject, layerType) {
    if (layerType === 'polygon') {
      return LayerConfigBuilder._buildPolygonJson(configObject);
    } else if (layerType === 'line') {
      return LayerConfigBuilder._buildLineJson(configObject);
    } else if (layerType === 'circle') {
      return LayerConfigBuilder._buildCircleJson(configObject);
    } else if (layerType === 'symbol') {
      return LayerConfigBuilder._buildSymbolJson(configObject);
    }    
  }

  /**
   * Method to build json for polygon layer
   * @param {PolygonLayerConfig | LineLayerConfig | CircleLayerConfig | SymbolLayerConfig} configObject 
   */
  static _buildPolygonJson(configObject) {
    var layerJSON = {
      'id': configObject.layerId,
      'type': configObject.type,
      'source': configObject.sourceId,
      'interactive': true,
      'layout': {
        'visibility': configObject.visibility
      }
    };
    if (configObject.sourceLayer) {
      layerJSON['source-layer'] = configObject.sourceLayer;
    }
    if (configObject.type === 'fill') {
      layerJSON['paint'] = {
        'fill-color': configObject.fillColor,
        'fill-opacity': configObject.fillOpacity
      };
      if (configObject.fillPattern) {
        layerJSON['paint']['fill-pattern'] = configObject.fillPattern;
      }
    } else if (configObject.type === 'line') {
      layerJSON['paint'] = { 
        'line-color': configObject.outlineColor,
        'line-width': configObject.outlineWidth,
        'line-dasharray': configObject.outlineDashArray    
      };
    }
    if (configObject.filter) {
      layerJSON['filter'] = configObject.filter;
    }
    return layerJSON;    
  };
  
  /**
   * Method to build json for line layer
   * @param {PolygonLayerConfig | LineLayerConfig | CircleLayerConfig | SymbolLayerConfig} configObject 
   */
  static _buildLineJson(configObject) {
    var layerJSON = {
      'id': configObject.layerId,
      'type': 'line',
      'source': configObject.sourceId,
      'interactive': true,
      'paint': {
        'line-color': configObject.lineColor,
        'line-opacity': configObject.lineOpacity,
        'line-width': configObject.lineWidth,
        'line-dasharray': configObject.lineDashArray
      },
      'layout': {
        'visibility': configObject.visibility
      }
    };
    if (configObject.sourceLayer) {
      layerJSON['source-layer'] = configObject.sourceLayer;
    }
    if (configObject.filter) {
      layerJSON['filter'] = configObject.filter;
    }
    return layerJSON;     
  }

  /**
   * Method to build json for circle layer
   * @param {PolygonLayerConfig | LineLayerConfig | CircleLayerConfig | SymbolLayerConfig} configObject 
   */
  static _buildCircleJson(configObject) {
    var layerJSON = {
      'id': configObject.layerId,
      'type': 'circle',
      'source': configObject.sourceId,
      'interactive': true,
      'paint': {
        'circle-color': configObject.circleColor,
        'circle-opacity': configObject.circleOpacity,
        'circle-radius': configObject.circleRadius
      },
      'layout': {
        'visibility': configObject.visibility
      }
    };
    if(configObject.sourceLayer) {
      layerJSON['source-layer'] = configObject.sourceLayer;
    }
    if (configObject.filter) {
      layerJSON['filter'] = configObject.filter;
    }    
    return layerJSON;
  }

  /**
   * Method to build json for symbol layer
   * @param {PolygonLayerConfig | LineLayerConfig | CircleLayerConfig | SymbolLayerConfig} configObject 
   */
  static _buildSymbolJson(configObject) {
    var layerJSON = {
      'id': configObject.layerId,
      'type': 'symbol',
      'interactive': true,
      'source': configObject.sourceId,
      'layout': {
        'icon-image': configObject.iconImage,
        'text-field': configObject.textField,
        'icon-allow-overlap': configObject.iconAllowOverlap,
        'text-allow-overlap': configObject.textAllowOverlap,
        'text-anchor': configObject.textAnchor,
        'text-size': configObject.textSize,
        'text-transform': configObject.textTransform,
        'visibility': configObject.visibility
      },
      'paint': {
        'text-halo-color': configObject.textHaloColor,
        'text-halo-width': configObject.textHaloWidth,
        'text-translate': configObject.textTranslate,
        'text-color': configObject.textColor
      }
    };
    if(configObject.sourceLayer) {
      layerJSON['source-layer'] = configObject.sourceLayer;
    }
    if (configObject.filter) {
      layerJSON['filter'] = configObject.filter;
    }
    if (configObject.iconRotateProperty) {
      layerJSON['layout']['icon-rotate'] = {};
      layerJSON['layout']['icon-rotate']['property'] = configObject.iconRotateProperty;
      layerJSON['layout']['icon-rotate']['stops'] = configObject.iconRotateStops;
    }
    return layerJSON;    
  }
}

export default LayerConfigBuilder;
