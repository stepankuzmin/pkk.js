import axios from 'axios';
import { FEATURE_TYPES } from './constants';

const defaultConfig = {
  baseURL: 'https://pkk5.rosreestr.ru/',
  featuresURL: '/api/features',
  referer: false,
};

/**
 * PKK API Client
 * @param {Object} config client config
 * @param {String} [config.baseURL='https://pkk5.rosreestr.ru/'] PKK base URL
 * @param {String} [config.featuresURL='/api/features/'] PKK features API URL
 * @param {Boolean|String} [config.referer=false] referer header
 */
class PKK {
  constructor(config = defaultConfig) {
    this.config = { ...defaultConfig, ...config };

    const headers = {};
    if (this.config.referer) {
      headers.referer = typeof this.config.referer === 'string' ? this.config.referer : this.config.baseURL;
    }

    this.axios = axios.create({ baseURL: this.config.baseURL, headers });
  }

  /**
   * Query PKK features near point
   * @param {Number} typeId feature type id
   * @param {Object} lnglat longitude and latitude
   * @param {Number} lnglat.lng longitude
   * @param {Number} lnglat.lat latitude
   * @param {Object} options query options
   * @param {Number} options.tolerance query tolerance
   * @param {Number} options.limit features query limit
   * @returns {Promise<Array<Features>>} response
   * @example
   * import PKK, { FEATURE_TYPES } from 'pkk';
   *
   * const pkk = new PKK();
   *
   * pkk.queryFeatures(
   *   FEATURE_TYPES.LAND_PLOT,
   *   { lng: 37.629, lat: 55.7252 },
   *   { tolerance: 100, limit: 12 }
   * ).then(features => {
   *   console.log(features);
   * });
   */
  queryFeatures = (typeId, { lng, lat }, options = { tolerance: 100, limit: 12 }) => {
    const params = {
      text: `${lat},${lng}`,
      limit: options.limit,
      tolerance: options.tolerance,
    };

    const featuresURL = `${this.config.featuresURL}/${typeId}`;
    return this.axios.get(featuresURL, { params }).then((response) => {
      const { data } = response;
      return data.features;
    });
  };

  /**
   * Query PKK feature info
   * @param {String} id feature id
   * @returns {Promise<Feature>} response
   * @example
   * import PKK, { FEATURE_TYPES } from 'pkk';
   *
   * const pkk = new PKK();
   *
   * pkk.getFeatureInfo(FEATURE_TYPES.LAND_PLOT, '77:1:1013:4985')
   *   .then(featureInfo => {
   *     console.log(featureInfo);
   *   });
   */
  getFeatureInfo = (typeId, featureId) => {
    const featureURL = `${this.config.featuresURL}/${typeId}/${featureId}`;
    return this.axios.get(featureURL).then((response) => {
      const { data } = response;
      return data.feature;
    });
  };
}

/**
 * Feature
 * @typedef {Object} Feature
 * @property {FeatureAttrs} attrs
 * @property {Object} center
 * @property {number} center.x
 * @property {number} center.y
 * @property {Object} extent
 * @property {number} extent.xmax
 * @property {number} extent.xmin
 * @property {number} extent.ymax
 * @property {number} extent.ymin
 * @property {number} [sort]
 * @property {number} type
 */

/**
 * Feature attributes
 * @typedef {Object} FeatureAttrs
 * @property {String} id feature id
 * @property {String} cn cadastral number
 * @property {String} address
 * @property {String} [adate]
 * @property {String} [anno_text]
 * @property {String} [area_type]
 * @property {String} [area_unit]
 * @property {Number} [area_value]
 * @property {Number} [cad_cost]
 * @property {Object} [cad_eng_dat]
 * @property {String} [cad_record_date]
 * @property {String} [cad_unit]
 * @property {String} [category_type]
 * @property {String} [date_cost]
 * @property {String} [date_create]
 * @property {String} [kvartal]
 * @property {String} [kvartal_cn]
 * @property {String} [okrug]
 * @property {String} [okrug_cn]
 * @property {String} [pubdate]
 * @property {String} [rayon]
 * @property {String} [rayon_cn]
 * @property {Number} [reg]
 * @property {Number} [rights_reg]
 * @property {String} [statecd]
 * @property {String} [util_by_doc]
 * @property {String} [util_code]
 */

export default PKK;

export { FEATURE_TYPES };
