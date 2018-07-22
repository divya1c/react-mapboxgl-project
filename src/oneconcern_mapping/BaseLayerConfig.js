class BaseLayerConfig {
  constructor () {
    this.layerId = undefined;
    this.sourceId = undefined;
    this.sourceLayer = undefined;
    this.visibility = 'visible';
    this.filter = null;
  }

  setLayerId(layerId) {
    this.layerId = layerId;
    return this;
  }

  setSourceId(sourceId) {
    this.sourceId = sourceId;
    return this;
  }

  setSourceLayer(sourceLayer) {
    this.sourceLayer = sourceLayer;
    return this;
  }

  setVisibility(visibility) {
    this.visibility = visibility;
    return this;
  }

  setFilter(filter) {
    this.filter = filter;
    return this;
  }
}

export default BaseLayerConfig;