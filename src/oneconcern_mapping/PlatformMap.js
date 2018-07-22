import mapboxgl from 'mapbox-gl';
import LayerConfigBuilder from './LayerConfigBuilder';
import oneConcernMapStyle from './MapStyle';

/** 
 * Class for creating a mapbox map
 */
class PlatformMap {
  /**
   * Constructor for platform map class
   * @param {string} containerElem react map container.
   * @param {number} zoom initial zoom for map. eg: 11
   * @param {number} minZoom minimim zoom for map. eg: 8
   * @param {number} maxZoom maximum zoom for map. eg: 22
   * @param {Array} center center for map [longitude, latitude]. eg: [-95.7043232068, 29.5747778706333]
   */
  constructor(containerElem, zoom, minZoom, maxZoom, center) {
    mapboxgl.accessToken = 
      'pk.eyJ1IjoiZGl2eWExYyIsImEiOiJjaXp6d29paTcwMTV2MndvbHA3dDFhM2FmIn0.xEL0EmIgD_wM69l5V6iI-A';

    this.map = new mapboxgl.Map({
      container: containerElem,
      style: oneConcernMapStyle,
      zoom: zoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
      center: center
    });
  }

  /**
   * Method to add source to map, with url.
   * @param {string} sourceId source id 
   * @param {string} url url for tile server api call
   */
  addSourceWithUrl(sourceId, url) {
    var sourceJSON = {
      'type': 'vector',
      'tiles': [url],
      'maxzoom': 14
    }
    this.removeSourceIfExists(sourceId);
    this.map.addSource(sourceId, sourceJSON);
  }

  /**
   * Used to add a source to map through geojson. 
   * Useful helper methods: 
   * this.getFeatureCollection: Present in map_helpers.js, this can be used.
   * to generate a feature collection from arrays of feature informations.
   * @param {string} sourceId source id
   * @param {json} featureCollectionGeojson a collection of features.
   */
  addSourceWithGeojson(sourceId, featureCollectionGeojson) {
    var sourceJSON = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': featureCollectionGeojson
      }
    };
    this.removeSourceIfExists(sourceId);
    this.map.addSource(sourceId, sourceJSON);
  }

  /**
   * Method to add a layer, given the layer json.
   * Usually used by other methods that generate the layer json.
   * @param {Object} layerConfigObject config object that contains all the required config for layer
   * @param {string} layerType layer type
   * @param {string} nextLayerId id of the layer that comes just after the added layer. Useful for z-positioning the layer.
   *        If null, layer is positioned in the natural order of encounter.
   */
  addLayer(layerConfigObject, layerType, nextLayerId) {
    var layerJSON = LayerConfigBuilder.buildLayerJson(layerConfigObject, layerType);
    this.removeLayerIfExists(layerJSON['id']);
    if (nextLayerId) {
      this.map.addLayer(layerJSON, nextLayerId);
    } else {
      this.map.addLayer(layerJSON);
    }
  }

  /**
   * Method to remove layer from map. 
   * Fails silently if layer is not present.
   * @param {string} layerId layer id
   */
  removeLayerIfExists(layerId) {
    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
  }

  /**
   * Method to remove source from map.
   * Fails silently if source is not present.
   * @param {string} sourceId source id
   */
  removeSourceIfExists(sourceId) {
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }  
  }

  /**
   * Method to check if map has a source
   * @param {string} sourceId source id
   * @returns {boolean}
   */
  hasSource(sourceId) {
    if (this.map.getSource(sourceId)) {
      return true;
    }
    return false;
  }
  /**
   * Method to show layer
   * @param {string} layerId layer id
   */
  showLayer(layerId) {
    if (!this.map.getLayer(layerId)) {
      console.error("showLayer error: layer(" + layerId + ") does not exist.");
      return;
    }
    this.map.setLayoutProperty(layerId, 'visibility', 'visible');
  }

  /**
   * Method to hide layer
   * @param {string} layerId layer id
   */
  hideLayer(layerId) {
    if (!this.map.getLayer(layerId)) {
      console.error("showLayer error: layer(" + layerId + ") does not exist.");
      return;
    }
    this.map.setLayoutProperty(layerId, 'visibility', 'none');
  }

 /**
  * Method to get all features within a view.
  * Because features come from tiled vector data, feature geometries may be split
  * or duplicated across tile boundaries and, as a result, features may appear
  * multiple times in query results. So, _getUniqueFeatures is called to filter
  * out the duplicate features.
  * @param {Array | null} filter filter, null by default
  * @param {string[]} layers array of layers to get features from
  */
  getFeaturesWithinView(layers, filter = null) {
    var features = this.map.queryRenderedFeatures({
      layers: layers,
      filter: filter
    });
    if (features) {
      var uniqueFeatures = this._getUniqueFeatures(features);  
      return uniqueFeatures;
    }
    return undefined;
  }

  /**
   * Method to get features from source
   * @param {Array | null} filter filter, null by default
   * @param {string} sourceId source id
   * @param {string} sourceLayer source layer name
   */
  getFeaturesFromSource(sourceId, sourceLayer, filter = null) {
    var features = this.map.querySourceFeatures(sourceId, {
      sourceLayer: sourceLayer,
      filter: filter
    });
    if (features) {
      var uniqueFeatures = this._getUniqueFeatures(features);  
      return uniqueFeatures;
    }
    return undefined;
  }

  /**
   * Method to add filters to the existing map filters.
   * Mapbox keeps a reference of current filter and does not 
   * replace the currentFilter with changes unless its deep copied.
   * So, the new filter is obtained by cloning the current filter.
   * @param {string} layerName layer to add filter to
   * @param {string[][]} addFilters array of filters to add. eg. [["==", "test", "2"], [">", "test", 1]]
   */
  // addFilter(layerName, addFilters) {
  //   var currentFilter = this.map.getFilter(layerName);
  //   if (currentFilter[0] !== "all") {
  //     var newFilter = clone(["all", currentFilter]);
  //   } else {
  //     var newFilter = clone(currentFilter);
  //   }
  //   var filterPresent = false;

  //   for (var j = 0; j < addFilters.length; j++) {
  //     var f = addFilters[j];
  //     filterPresent = false;
  //     for (var i = 0; i < newFilter.length; i++) {
  //       if (newFilter[i] === "all") {
  //         continue;
  //       }
  //       if (newFilter[i][1] === f[1] && newFilter[i][0] === f[0]) {
  //         filterPresent = true;
  //         newFilter[i] = f;
  //       }
  //     }
  //     if (!filterPresent) {
  //       newFilter.push(f);
  //     }
  //   }
  //   this.map.setFilter(layerName, newFilter);
  // }

  /**
   * Method to remove filter.
   * Mapbox keeps a reference of current filter and does not 
   * replace the currentFilter with changes unless its deep copied.
   * So, the new filter is obtained by cloning the current filter.
   * @param {string} featureName all filters associated with the feature name will be removed
   * @param {string} layerName layer to remove filters from
   */
  // removeFilter(featureName, layerName) {
  //   var currentFilter = this.map.getFilter(layerName);
  //   if (currentFilter[0] !== 'all' && currentFilter[1] === featureName) {
  //     this.map.setFilter(layerName, null);
  //   } else if (currentFilter[0] === 'all') {
  //     var newFilter = clone(currentFilter);
  //     for (var i = 0; i < newFilter.length;) {
  //       if (newFilter[i] === "all" || newFilter[i][1] !== featureName) {
  //         i++;
  //         continue;
  //       } else {
  //         newFilter.splice(i, 1);
  //       }
  //     }
  //     if (newFilter.length === 1) {
  //       newFilter = null;
  //     }
  //     this.map.setFilter(layerName, newFilter);
  //   }
  // }

  /**
  * Method to get feature collection from raw point data
  * Returns a feature collection json that can be used to make a map source
  * @param {string} geometryType geometry type eg. 'Point'
  * @param {Array} coordinatesArray array of coordinates for the points
  * @param {Array} propertiesArray array of properties for each of the points
  */
  getFeatureCollection(geometryType, coordinatesArray, propertiesArray) {
    if (typeof propertiesArray !== 'undefined' && coordinatesArray.length !== propertiesArray.length) {
      console.error ('getFeatureCollection error: coordinatesArray and propertiesArray should be of the same length.');
      return;
    }
    var featureCollection = [];
    var feature = undefined;
    for (var i = 0; i < coordinatesArray.length; i++) {
      feature = {
        type: 'Feature',
        geometry: {
          type: geometryType,
          coordinates: coordinatesArray[i]
        }   
      }
      if (typeof propertiesArray !== 'undefined') {
        feature['properties'] = propertiesArray[i];
      }
      featureCollection.push(feature);
    }
    return featureCollection;
  }

  /**
  * Method to get bounding box
  * @param {number} sw_lng South west longitude for the box. Decimal type
  * @param {number} sw_lat South west latitude for the box. Decimal type
  * @param {number} ne_lng North east longitude for the box. Decimal type
  * @param {number} ne_lat North east latitude for the box. Decimal type
  */
  getBoundingBox(sw_lng, sw_lat, ne_lng, ne_lat) {
    var sw = new mapboxgl.Point(sw_lng, sw_lat);
    var ne = new mapboxgl.Point(ne_lng, ne_lat);
    return [sw, ne];
  }
  /**
   * Method to get default map bounds
   * @returns {Array} [NorthEast, SouthWest] bounds of map in latitude and longitude
   */
  getDefaultBounds() {
    var bounds = this.map.getBounds();
    return [bounds._sw, bounds._ne];
  }

  /**
   * Method to fly to specific place
   * @param {LngLat} A LngLat object represents a given longitude and latitude coordinate, measured in degrees. (from mapbox)
   * @param {integer} zoom 12 by default Zoom level for the bounds
   */
  flytoPoint(location, zoom = 12) {
    this.map.flyTo({
      center: [location.lng, location.lat],
      zoom: zoom
    });
  }

  /**
   * Method to fit map to bounds
   * @param {LngLat} locationLowerRight
   * @param {LngLat} locationUpperLeft
   * @param {integer} zoom
   */
  fitToBounds(locationLowerRight, locationUpperLeft) {
    this.map.fitBounds(
      new mapboxgl.LngLatBounds(
        locationLowerRight, 
        locationUpperLeft
      )
    );
  }

  /**
   * Method to disable drag rotate and touch zoom rotate
   */
  disableAllRotation() {
    // disable map rotation using right click + drag
    this.map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();    
  }


  /**
   * Method that adds satellite toggle functionality to map
   */
  addSatelliteToggle(map) {
    // Adds toggle for satellite view of underlying map
    document.getElementById("onoffswitch-satlayer").onchange = function(e){
      var overlayLayerNames = ['water', 'building', 'landuse_industrial', 'landuse_park',
        'landuse_overlay_national_park', 'landuse_wood', 'landcover_snow',
        'landcover_crop', 'landcover_grass', 'landcover_scrub', 'landcover_wood',
        'hillshade_highlight_bright', 'hillshade_highlight_med',
        'hillshade_shadow_faint', 'hillshade_shadow_med', 'hillshade_shadow_dark',
        'hillshade_shadow_extreme'
      ];
      e.preventDefault();
      e.stopPropagation();
      if (this.checked === false) {
        map.hideLayer('satellite');
        for (let i = 0; i < overlayLayerNames.length; i++) {
          map.showLayer(overlayLayerNames[i]);
        }
      } else {
        map.showLayer('satellite');
        for (let i = 0; i < overlayLayerNames.length; i++) {
          map.hideLayer(overlayLayerNames[i]);
        }
      }
    }
  }

  /**
   * Method that adds basic criticalinfrastructure toggle functionality to map
   */
  addBasicCriticalinfrastructureToggle(map) {
    var basicCriticalinfrastructureLayers = ["healthcare-and-public-health", "shelters", 
      "education", "energy", "communication", "transportation", "law-enforcement",
      "fire", "water", "senior-facilities", "horses", "eoc", "government", "hcid-field-offices", 
      "community-emergency-hubs", "recreation-centers", "bridges"];
    for (var i = 0; i < basicCriticalinfrastructureLayers.length; i++) {
      let toggleElem = document.getElementById("onoffswitch-" + basicCriticalinfrastructureLayers[i]);
      if (toggleElem) {
        let layer = basicCriticalinfrastructureLayers[i];
        document.getElementById("onoffswitch-" + layer).onchange = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (this.checked === false) {
            map.hideLayer('basic-ci-' + layer);
          } else {
            map.showLayer('basic-ci-' + layer);
          }
        };
      }    
    }  
  }

  /**
  * Method to filter out duplicate features.
  * @param {json[]} features an array of features
  */
  _getUniqueFeatures(features) {
    var existingFeatureKeys = {};
    var uniqueFeatures = features.filter(function(feature) {
        if (existingFeatureKeys[feature.properties["geoid10"]]) {
            return false;
        } else {
            existingFeatureKeys[feature.properties["geoid10"]] = true;
            return true;
        }
    });
    return uniqueFeatures;
  }
}

export default PlatformMap;