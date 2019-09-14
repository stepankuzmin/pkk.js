/* eslint-disable import/prefer-default-export */

/**
 * Типы объектов
 * @param {Object} FEATURE_TYPES Типы объектов
 * @param {number} FEATURE_TYPES.LAND_PLOT Земельные участки
 * @param {number} FEATURE_TYPES.LAND_QUARTER Кварталы
 * @param {number} FEATURE_TYPES.LAND_AREA Районы
 * @param {number} FEATURE_TYPES.LAND_DISTRICT Округи
 * @param {number} FEATURE_TYPES.CCO ОКСы
 * @param {number} FEATURE_TYPES.TERRITORIAL_AREA Территориальные зоны
 * @param {number} FEATURE_TYPES.BOUNDARY Границы
 * @param {number} FEATURE_TYPES.BOUNDARY_REFERENCE_NETWORK ОМС
 * @param {number} FEATURE_TYPES.USE_RESTRICTED_ZONE ЗОУИТы
 * @param {number} FEATURE_TYPES.FORESTRY Лесничества и лесопарки
 */
export const FEATURE_TYPES = {
  LAND_PLOT: 1,
  LAND_QUARTER: 2,
  LAND_AREA: 3,
  LAND_DISTRICT: 4,
  CCO: 5,
  TERRITORIAL_AREA: 6,
  BOUNDARY: 7,
  BOUNDARY_REFERENCE_NETWORK: 9,
  USE_RESTRICTED_ZONE: 10,
  FORESTRY: 12,
};
