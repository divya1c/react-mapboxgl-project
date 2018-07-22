import BaseLayerConfig from './BaseLayerConfig';

class SymbolLayerConfig extends BaseLayerConfig {
  /**
   * Method used to get layer config for a symbol layer to map. Layer config consists of the following:
   * layerId: layer id
   * sourceId: source id
   * sourceLayer: source layer name. will not be specified if the source is a geojson source
   * visibility: visibility, 'visible' by default
   * filter: filter for layer, null by default 
   * iconImage: name of the image from map sprite
   * textField: text displayed with the icon, blank by default
   * iconAllowOverlap: If true, the icon will be visible even if it 
   *    collides with other previously drawn symbols, false by default
   * textAllowOverlap: If true, the text will be visible even if it
   *    collides with other previously drawn symbols, false by default
   * textAnchor: anchor for start of the text field, could be right, left, center, 
   *    top-right, bottom-right etc, center by default.
   * textSize: font size for text, 10px by default
   * textTransform: text transform, uppercase by default
   * textHaloColor: color for the halo around the text, white by default
   * textHaloWidth: halo width, 2px by default
   * textTranslate: translate [x, y], positive for right and bottom. [12, 0] by default
   * textColor: text color, dark blue by default
   */  
  constructor () {
    super();
    this.iconImage = undefined;
    this.iconRotateProperty = undefined;
    this.iconRotateStops = undefined;
    this.textField = '';
    this.iconAllowOverlap = false;
    this.textAllowOverlap = false;
    this.textAnchor = 'center';
    this.textSize = 10;
    this.textTransform = 'uppercase';
    this.textHaloColor = '#FFFFFF';
    this.textHaloWidth = 2;
    this.textTranslate = [12, 0];
    this.textColor = '#43506B';
    return this;
  }

  /**
   * Method to set icon image. Should be the name of the icon in sprite.
   * @param {string} iconImage 
   */
  setIconImage(iconImage) {
    this.iconImage = iconImage;
    return this;
  }

  /**
   * Method to set text field
   * @param {string} textField 
   */
  setTextField(textField) {
    this.textField = textField;
    return this;
  }

  /**
   * Method to set iconAllowOverlap. If true, the icon will be visible even if it
   * collides with other previously drawn symbols, false by default
   * @param {boolean} iconAllowOverlap 
   */
  setIconAllowOverlap(iconAllowOverlap) {
    this.iconAllowOverlap = iconAllowOverlap;
    return this;
  }

  /**
   * Method to set textAllowOverlap. If true, the text will be visible even if it
   * collides with other previously drawn symbols, false by default
   * @param {boolean} textAllowOverlap 
   */
  setTextAllowOverlap(textAllowOverlap) {
    this.textAllowOverlap = textAllowOverlap;
    return this;
  }

  /**
   * Method to set text anchor. anchor for start of the text field, could be right, left, 
   * center, top-right, bottom-right etc, center by default.
   * @param {string} textAnchor 
   */
  setTextAnchor(textAnchor) {
    this.textAnchor = textAnchor;
    return this;
  }

  /**
   * Method to set text size (in px).
   * @param {number} textSize 
   */
  setTextSize(textSize) {
    this.textSize = textSize;
    return this;
  }

  /**
   * Method to set text transform, uppercase by default
   * @param {string} textTransform 
   */
  setTextTransform(textTransform) {
    this.textTransform = textTransform;
    return this;
  }

  /**
   * Method to set text halo color. color for the halo around the text, white by default
   * @param {string} textHaloColor 
   */
  setTextHaloColor(textHaloColor) {
    this.textHaloColor = textHaloColor;
    return this;
  }

  /**
   * Method to text halo width
   * @param {number} textHaloWidth 
   */
  setTextHaloWidth(textHaloWidth) {
    this.textHaloWidth = textHaloWidth;
    return this;
  }

  /**
   * Method to set text translate
   * translate [x, y], positive for right and bottom. [12, 0] by default
   * @param {number[]} textTranslate 
   */
  setTextTranslate(textTranslate) {
    this.textTranslate = textTranslate;
    return this;
  }

  /**
   * Method to set text color
   * @param {string} textColor 
   */
  setTextColor(textColor) {
    this.textColor = textColor;
    return this;
  }

  /**
   * Method to set icon rotate property
   * @param {string} iconRotateProperty 
   */
  setIconRotateProperty(iconRotateProperty) {
    this.iconRotateProperty = iconRotateProperty;
    return this;
  }

  /**
   * Method to set icon rotate stops
   * @param {string} iconRotateStops 
   */
  setIconRotateStops(iconRotateStops) {
    this.iconRotateStops = iconRotateStops;
    return this;
  }  
}

export default SymbolLayerConfig;