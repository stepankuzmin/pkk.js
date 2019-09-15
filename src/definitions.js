/* This file is autogenerated, do not edit */

/**
 * Объект
 * @typedef {Object} Feature
 * @property {number} type Тип объекта
 * @property {FeatureAttributes} attrs Cписок атрибутов
 * @property {{x: number, y: number}} center Центр объекта
 * @property {{xmax: number, xmin: number, ymax: number, ymin: number}} extent Экстент объекта
 */

/**
 * Cписок атрибутов
 * @typedef {Object} FeatureAttributes
 * @property {String} id Идентификатор
 * @property {String} cn Кадастровый номер
 * @property {String} statecd Статус
 * @property {String} address Адрес
 * @property {String} kladr Код КЛАДР
 * @property {String} fp Форма собственности
 * @property {String} adate Дата выгрузки сведений из ГКН
 * @property {String} anno_text Надпись на карте
 * @property {String} area_type Тип площади
 * @property {String} area_unit Единицы измерения площади
 * @property {String} area_value Декларированная площадь
 * @property {String} cad_cost Кадастровая стоимость
 * @property {String} cad_eng_data Кадастровый инженер
 * @property {String} cad_record_date Дата изменения сведений в ГКН
 * @property {String} cad_unit Единицы измерения стоимости
 * @property {String} category_type Категория земель
 * @property {String} date_cost Дата внесения кадастровой стоимости
 * @property {String} date_create Дата постановки на учет
 * @property {String} kvartal_cn Кадастровый номер квартала
 * @property {String} kvartal Квартал
 * @property {String} okrug_cn Кадастровый номер округа
 * @property {String} okrug Округ
 * @property {String} pubdate Дата опубликования на ПКК
 * @property {String} rayon_cn Кадастровый номер района
 * @property {String} rayon Район
 * @property {String} reg Номер субъекта
 * @property {String} rifr_cnt Контактное лицо
 * @property {String} rifr_dep Орган власти
 * @property {String} rifr Свободен от прав третьих лиц
 * @property {String} rights_reg Зарегистрированы права (да/нет)
 * @property {String} sale_cnt Контактное лицо
 * @property {String} sale_date Дата проведения торгов
 * @property {String} sale_dep Орган власти
 * @property {String} sale_price Начальная цена
 * @property {String} sale Принято решение о проведении торгов
 * @property {String} util_by_doc Разрешенное использование по документу
 * @property {String} util_code Разрешенное использование
 * @property {String} cc_date_approval Дата утверждения категории земель
 */

/**
 * Типы объектов
 * @typedef {Object} FEATURE_TYPES
 * @property {number} LAND_LOT Земельные участки (1)
 * @property {number} LAND_QUARTER Кварталы (2)
 * @property {number} LAND_AREA Районы (3)
 * @property {number} LAND_DISTRICT Округи (4)
 * @property {number} CCO ОКСы (5)
 * @property {number} TERRITORIAL_AREA Территориальные зоны (6)
 * @property {number} BOUNDARY Границы (7)
 * @property {number} BOUNDARY_REFERENCE_NETWORK ОМС (9)
 * @property {number} USE_RESTRICTED_ZONE ЗОУИТы (10)
 * @property {number} FORESTRY Лесничества и лесопарки (12)
 * @property {number} BUILDING_LINE Красные линии (13)
 * @property {number} LAND_LOT_LAYOUT Схемы расположения ЗУ (15)
 * @property {number} FREE_ECONOMIC_ZONE Свободные экономические зоны (16)
 */
