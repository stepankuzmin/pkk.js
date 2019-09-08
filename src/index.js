import axios from 'axios';

/**
 * PKK API Client
 * @param {Object} config client config
 * @param {String} config.baseURL PKK base URL
 * @param {String} config.featuresURL PKK features API URL
 */
class PKK {
  constructor(
    config = {
      baseURL: 'https://pkk5.rosreestr.ru/',
      featuresURL: '/api/features/1',
    },
  ) {
    this.baseURL = config.baseURL;
    this.featuresURL = config.featuresURL;

    this.axios = axios.create({
      baseURL: config.baseURL,
      headers: { referer: config.baseURL },
    });
  }

  /**
   * Query PKK features near point
   * @param {Object} lnglat longitude and latitude
   * @param {Number} lnglat.lng longitude
   * @param {Number} lnglat.lat latitude
   * @param {Object} options query options
   * @param {Number} options.tolerance query tolerance
   * @param {Number} options.limit features query limit
   * @returns {Promise<Array<Features>>} response
   * @example
   * pkk.queryFeatures({ lng: 37.629, lat: 55.7252 }, { tolerance: 100, limit: 12 });
   */
  queryFeatures = ({ lng, lat }, options = { tolerance: 100, limit: 12 }) => {
    const params = {
      text: `${lat},${lng}`,
      limit: options.limit,
      tolerance: options.tolerance,
    };

    return this.axios.get(this.featuresURL, { params }).then((response) => {
      const { data } = response;
      return data.features;
    });
  };

  /**
   * Query PKK feature info
   * @param {String} id feature id
   * @returns {Promise<Feature>} response
   * @example
   * pkk.getFeatureInfo('77:1:1013:4985');
   */
  getFeatureInfo = (id) => {
    const featureURL = `${this.featuresURL}/${id}`;
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
