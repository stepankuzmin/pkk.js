import axios from 'axios';
import Polyglot from 'node-polyglot';
import translations from './translations';
import './definitions';

const defaultConfig = {
  baseURL: 'https://pkk5.rosreestr.ru/',
  featuresURL: '/api/features',
  referer: false,
  lang: 'ru',
};

/**
 * PKK API Client
 * @param {Object} config client config
 * @param {String} [config.baseURL='https://pkk5.rosreestr.ru/'] PKK base URL
 * @param {String} [config.featuresURL='/api/features/'] PKK features API URL
 * @param {Boolean|String} [config.referer=false] referer header
 * @param {String} [config.lang='ru'] i18n language
 */
class PKK {
  constructor(config = defaultConfig) {
    this.config = { ...defaultConfig, ...config };

    const phrases = translations[this.config.lang];
    this.polyglot = new Polyglot({ phrases });

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
   * @returns {Promise<Array<Feature>>} response
   * @example
   * import PKK, { FEATURE_TYPES } from 'pkk';
   *
   * const pkk = new PKK();
   *
   * pkk.queryFeatures(
   *   FEATURE_TYPES.LAND_LOT,
   *   { lng: 37.629, lat: 55.7252 },
   *   { tolerance: 100, limit: 12 }
   * ).then((features) => {
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
      if (data.status !== 200) {
        throw new Error(data.note);
      }

      return data.features;
    });
  };

  /**
   * Query PKK feature info
   * @param {Number} typeId feature type id
   * @param {String} featureId feature id
   * @returns {Promise<Feature>} response
   * @example
   * import PKK, { FEATURE_TYPES } from 'pkk';
   *
   * const pkk = new PKK();
   *
   * pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985')
   *   .then((featureInfo) => {
   *     console.log(featureInfo);
   *   });
   */
  getFeatureInfo = (typeId, featureId) => {
    const featureURL = `${this.config.featuresURL}/${typeId}/${featureId}`;
    return this.axios.get(featureURL).then((response) => {
      const { data } = response;
      if (data.status !== 200) {
        throw new Error(data.note);
      }

      return data.feature;
    });
  };

  /**
   * Formats feature info with i18n labels
   * @param {Object} featureInfo feature info
   * @returns {Object} featureInfo translated feature info
   * @example
   * import PKK, { FEATURE_TYPES } from 'pkk';
   *
   * const pkk = new PKK();
   *
   * pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985')
   *   .then((featureInfo) => {
   *     console.log(pkk.formatFeatureInfo(featureInfo));
   *   });
   */
  formatFeatureInfo = (featureInfo = {}) => {
    /* eslint-disable camelcase */
    const { type } = featureInfo;

    const {
      area_type,
      area_unit,
      area_value,
      cad_cost,
      cad_eng_data,
      cad_unit,
      category_type,
      fp,
      statecd,
      util_code,
      ...attrs
    } = featureInfo.attrs;

    const translatedAttrs = {
      area_value: this.formatAreaValue(featureInfo),
      cad_cost: this.formatCadastralCost(featureInfo),
      cad_eng_data: this.formatCadastralEngineer(featureInfo),
    };

    if (area_type) {
      translatedAttrs.area_type = {
        label: this.polyglot.t(`attrs.${type}.area_type`),
        value: this.polyglot.t(`AREA_TYPES.${area_type}`),
      };
    }

    if (category_type) {
      translatedAttrs.category_type = {
        label: this.polyglot.t(`attrs.${type}.category_type`),
        value: this.polyglot.t(`CATEGORY_TYPES.${category_type}`),
      };
    }

    if (statecd) {
      translatedAttrs.statecd = {
        label: this.polyglot.t(`attrs.${type}.statecd`),
        value: this.polyglot.t(`STATE_TYPES.${statecd}`),
      };
    }

    if (fp) {
      translatedAttrs.fp = {
        label: this.polyglot.t(`attrs.${type}.fp`),
        value: this.polyglot.t(`FP_TYPES.${fp}`),
      };
    }

    if (util_code) {
      translatedAttrs.util_code = {
        label: this.polyglot.t(`attrs.${type}.util_code`),
        value: this.polyglot.t(`UTIL_TYPES.${util_code}`),
      };
    }

    Object.keys(attrs).forEach((attr) => {
      translatedAttrs[attr] = {
        label: this.polyglot.t(`attrs.${type}.${attr}`),
        value: attrs[attr],
      };
    });

    return { ...featureInfo, attrs: translatedAttrs };
    /* eslint-enable camelcase */
  };

  formatAreaValue = (featureInfo) => {
    const {
      type,
      attrs: { area_value: areaValue, area_unit: unitId },
    } = featureInfo;

    const label = this.polyglot.t(`attrs.${type}.area_value`);

    if (!areaValue || !unitId) {
      return { label, value: null };
    }

    const units = this.polyglot.t(`UNITS.${unitId}`);
    const value = `${areaValue} ${units}`;

    return { label, value };
  };

  formatCadastralCost = (featureInfo) => {
    const {
      type,
      attrs: { cad_cost: cost, cad_unit: unitId },
    } = featureInfo;

    const label = this.polyglot.t(`attrs.${type}.cad_cost`);

    if (!cost || !unitId) {
      return { label, value: null };
    }

    const units = this.polyglot.t(`UNITS.${unitId}`);
    const value = `${cost} ${units}`;

    return { label, value };
  };

  formatCadastralEngineer = ({ type, attrs: { cad_eng_data: data } }) => {
    const label = this.polyglot.t(`attrs.${type}.cad_eng_data`);

    if (!data) {
      return { label, value: null };
    }

    const value = data.rc_type === 0
      ? `${data.ci_surname} ${data.ci_first} ${data.ci_patronymic}`
      : data.co_name;

    return { label, value };
  };
}

export default PKK;
export * from './constants';
