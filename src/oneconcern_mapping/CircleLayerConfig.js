import BaseLayerConfig from './BaseLayerConfig';

class CircleLayerConfig extends BaseLayerConfig {
  /**
   * Method used to get layer config for a line layer to map. Layer config consists of the following:
   * layerId: layer id
   * sourceId: source id
   * sourceLayer: source layer name. will not be specified if the source is a geojson source
   * visibility: visibility, 'visible' by default
   * filter: filter for layer, null by default
   * circleColor: circle fill color, grey by default
   * circleOpacity: circle opacity, 1 by default
   * circleRadius: circle radius, 10 by default
   */  
  constructor () {
    super();
    this.circleColor = '#CCCCCC';
    this.circleOpacity = 1;
    this.circleRadius = 10;
    return this;
  }

  /**
   * Method to set circle color
   * @param {string} circleColor 
   */
  setCircleColor(circleColor) {
    this.circleColor = circleColor;
    return this;
  }

  /**
   * Method to set circle opacity
   * @param {number} circleOpacity 
   */
  setCircleOpacity(circleOpacity) {
    this.circleOpacity = circleOpacity;
    return this;
  }

  /**
   * Method to set circle radius
   * @param {number} circleRadius 
   */
  setCircleRadius(circleRadius) {
    this.circleRadius = circleRadius;
    return this;
  }  
}

export default CircleLayerConfig;