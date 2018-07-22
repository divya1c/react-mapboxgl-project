import BaseLayerConfig from './BaseLayerConfig';

class PolygonLayerConfig extends BaseLayerConfig {
  /**
   * Method used to get layer config for a polygon layer to map. Layer config consists of the following:
   * layerId: layer id
   * sourceId: source id
   * sourceLayer: source layer name. will not be specified if the source is a geojson source
   * visibility: visibility, 'visible' by default
   * filter: filter for layer, null by default
   * fillColor: fill color for polygon, red by default
   * fillOpacity: opacity for the fill, 0.7 by default
   * fillPattern: sprite icon name for pattern
   * lineColor: outline color for polygon, red by default
   * lineWidth: outline width, 1 by default
   * lineDashArray: line dash array
   *   specifies the lengths of the alternating dashes and gaps that form the dash pattern.
   *   The lengths are later scaled by the line width. To convert a dash length to pixels, 
   *   multiply the length by the current line width. No dash by default. 
   */  
  constructor () {
    super();
    this.fillColor = '#EE362B';
    this.fillOpacity = 0.7;
    this.fillPattern = undefined;
    this.outlineColor = '#EE362B';
    this.outlineWidth = 1;
    this.outlineDashArray = [1, 0];
    this.type = 'fill';
    return this;
  }

  /**
   * Method to set type of polygon. Fill/line.
   * @param {string} type 
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * Method to set fill color
   * @param {string} fillColor 
   */
  setFillColor(fillColor) {
    this.fillColor = fillColor;
    return this;
  }

  /**
   * Method to set fill opacity
   * @param {number} fillOpacity 
   */
  setFillOpacity(fillOpacity) {
    this.fillOpacity = fillOpacity;
    return this;
  }

  /**
   * Method to set fill opacity
   * @param {number} fillPattern 
   */
  setFillPattern(fillPattern) {
    this.fillPattern = fillPattern;
    return this;
  }  

  /**
   * Method to set outline color
   * @param {string} outlineColor 
   */
  setOutlineColor(outlineColor) {
    this.outlineColor = outlineColor;
    return this;
  }

  /**
   * Method to set outline width
   * @param {number} outlineWidth 
   */
  setOutlineWidth(outlineWidth) {
    this.outlineWidth = outlineWidth;
    return this;
  }

  /**
   * Method to set line dash array. Line dash array specifies the lengths of the alternating 
   * dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. 
   * To convert a dash length to pixels, multiply the length by the current line width. No dash by default. 
   * @param {number[]} outlineDashArray 
   */
  setOutlineDashArray(outlineDashArray) {
    this.outlineDashArray = outlineDashArray;
    return this;
  }
}

export default PolygonLayerConfig;