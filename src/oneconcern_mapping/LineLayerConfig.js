import BaseLayerConfig from './BaseLayerConfig';

class LineLayerConfig extends BaseLayerConfig {
  /**
   * Method used to get layer config for a line layer to map. Layer config consists of the following:
   * layerId: layer id
   * sourceId: source id
   * sourceLayer: source layer name. will not be specified if the source is a geojson source
   * visibility: visibility, 'visible' by default
   * filter: filter for layer, null by default
   * lineColor: line color, black by default
   * lineOpacity: line opacity, 1 by default
   * lineWidth: line width, 3px by default
   * lineDashArray: line dash array
   *   specifies the lengths of the alternating dashes and gaps that form the dash pattern.
   *   The lengths are later scaled by the line width. To convert a dash length to pixels, 
   *   multiply the length by the current line width. No dash by default.    
   */  
  constructor () {
    super();
    this.lineColor = '#000000';
    this.lineOpacity = 1;
    this.lineWidth = 3;
    this.lineDashArray = [3, 0];
    return this;
  }

  /**
   * Method to set line color
   * @param {string} lineColor 
   */
  setLineColor(lineColor) {
    this.lineColor = lineColor;
    return this;
  }

  /**
   * Method to set line opacity
   * @param {number} lineOpacity 
   */
  setLineOpacity(lineOpacity) {
    this.lineOpacity = lineOpacity;
    return this;
  }

  /**
   * Method to set line width
   * @param {number} lineWidth 
   */
  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
    return this;
  }

  /**
   * Method to set line dash array. Line dash array specifies the lengths of the alternating 
   * dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. 
   * To convert a dash length to pixels, multiply the length by the current line width. No dash by default. 
   * @param {number[]} lineDashArray 
   */
  setLineDashArray(lineDashArray) {
    this.lineDashArray = lineDashArray;
    return this;
  }  
}

export default LineLayerConfig;