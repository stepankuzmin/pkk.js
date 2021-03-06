# pkk.js

[![Build Status](https://img.shields.io/circleci/project/github/stepankuzmin/pkk.js.svg?style=popout)](https://circleci.com/gh/stepankuzmin/pkk.js)
![npm](https://img.shields.io/npm/v/pkk)
![npm](https://img.shields.io/npm/dt/pkk)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/pkk)

JavaScript Client for Public Cadastral Map ([pkk5.rosreestr.ru](https://pkk5.rosreestr.ru))

## Install

```shell
npm install pkk
```

## Usage

```js
import PKK, { FEATURE_TYPES } from 'pkk';

const pkk = new PKK();

pkk
  .queryFeatures(
    FEATURE_TYPES.LAND_PLOT,
    { lng: 37.629, lat: 55.7252 },
    { tolerance: 100, limit: 12 }
  )
  .then((features) => {
    const feature = features[0];
    const featureInfo = pkk.getFeatureInfo(FEATURE_TYPES.LAND_PLOT, feature.attrs.id);
    return featureInfo;
  })
  .then((featureInfo) => {
    console.log(pkk.formatFeatureInfo(featureInfo));
  });
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [PKK](#pkk)
    -   [Parameters](#parameters)
    -   [queryFeatures](#queryfeatures)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples)
    -   [getFeatureInfo](#getfeatureinfo)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-1)
    -   [formatFeatureInfo](#formatfeatureinfo)
        -   [Parameters](#parameters-3)
        -   [Examples](#examples-2)
-   [Feature](#feature)
    -   [Properties](#properties)
-   [FeatureAttributes](#featureattributes)
    -   [Properties](#properties-1)
-   [FEATURE_TYPES](#feature_types)
    -   [Properties](#properties-2)

### PKK

PKK API Client

#### Parameters

-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** client config (optional, default `defaultConfig`)
    -   `config.baseURL` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PKK base URL (optional, default `'https://pkk5.rosreestr.ru/'`)
    -   `config.featuresURL` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PKK features API URL (optional, default `'/api/features/'`)
    -   `config.referer` **([Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** referer header (optional, default `false`)
    -   `config.lang` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** i18n language (optional, default `'ru'`)

#### queryFeatures

Query PKK features near point

##### Parameters

-   `typeId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** feature type id
-   `lnglat` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** longitude and latitude
    -   `lnglat.lng` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** longitude
    -   `lnglat.lat` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** latitude
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** query options (optional, default `{tolerance:100,limit:12}`)
    -   `options.tolerance` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** query tolerance
    -   `options.limit` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** features query limit

##### Examples

```javascript
import PKK, { FEATURE_TYPES } from 'pkk';

const pkk = new PKK();

pkk.queryFeatures(
  FEATURE_TYPES.LAND_LOT,
  { lng: 37.629, lat: 55.7252 },
  { tolerance: 100, limit: 12 }
).then((features) => {
  console.log(features);
});
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Feature](#feature)>>** response

#### getFeatureInfo

Query PKK feature info

##### Parameters

-   `typeId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** feature type id
-   `featureId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** feature id

##### Examples

```javascript
import PKK, { FEATURE_TYPES } from 'pkk';

const pkk = new PKK();

pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985')
  .then((featureInfo) => {
    console.log(featureInfo);
  });
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Feature](#feature)>** response

#### formatFeatureInfo

Formats feature info with i18n labels

##### Parameters

-   `featureInfo` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** feature info (optional, default `{}`)

##### Examples

```javascript
import PKK, { FEATURE_TYPES } from 'pkk';

const pkk = new PKK();

pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985')
  .then((featureInfo) => {
    console.log(pkk.formatFeatureInfo(featureInfo));
  });
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** featureInfo translated feature info

### Feature

Объект

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `type` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Тип объекта
-   `attrs` **[FeatureAttributes](#featureattributes)** Cписок атрибутов
-   `center` **{x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), y: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}** Центр объекта
-   `extent` **{xmax: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), xmin: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), ymax: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), ymin: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}** Экстент объекта

### FeatureAttributes

Cписок атрибутов

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Идентификатор
-   `cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровый номер
-   `statecd` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Статус
-   `address` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Адрес
-   `kladr` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Код КЛАДР
-   `fp` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Форма собственности
-   `adate` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата выгрузки сведений из ГКН
-   `anno_text` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Надпись на карте
-   `area_type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Тип площади
-   `area_unit` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Единицы измерения площади
-   `area_value` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Декларированная площадь
-   `cad_cost` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровая стоимость
-   `cad_eng_data` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровый инженер
-   `cad_record_date` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата изменения сведений в ГКН
-   `cad_unit` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Единицы измерения стоимости
-   `category_type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Категория земель
-   `date_cost` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата внесения кадастровой стоимости
-   `date_create` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата постановки на учет
-   `kvartal_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровый номер квартала
-   `kvartal` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Квартал
-   `okrug_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровый номер округа
-   `okrug` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Округ
-   `pubdate` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата опубликования на ПКК
-   `rayon_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Кадастровый номер района
-   `rayon` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Район
-   `reg` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Номер субъекта
-   `rifr_cnt` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Контактное лицо
-   `rifr_dep` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Орган власти
-   `rifr` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Свободен от прав третьих лиц
-   `rights_reg` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Зарегистрированы права (да/нет)
-   `sale_cnt` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Контактное лицо
-   `sale_date` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата проведения торгов
-   `sale_dep` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Орган власти
-   `sale_price` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Начальная цена
-   `sale` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Принято решение о проведении торгов
-   `util_by_doc` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Разрешенное использование по документу
-   `util_code` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Разрешенное использование
-   `cc_date_approval` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Дата утверждения категории земель

### FEATURE_TYPES

Типы объектов

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `LAND_LOT` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Земельные участки (1)
-   `LAND_QUARTER` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Кварталы (2)
-   `LAND_AREA` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Районы (3)
-   `LAND_DISTRICT` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Округи (4)
-   `CCO` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ОКСы (5)
-   `TERRITORIAL_AREA` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Территориальные зоны (6)
-   `BOUNDARY` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Границы (7)
-   `BOUNDARY_REFERENCE_NETWORK` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ОМС (9)
-   `USE_RESTRICTED_ZONE` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ЗОУИТы (10)
-   `FORESTRY` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Лесничества и лесопарки (12)
-   `BUILDING_LINE` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Красные линии (13)
-   `LAND_LOT_LAYOUT` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Схемы расположения ЗУ (15)
-   `FREE_ECONOMIC_ZONE` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Свободные экономические зоны (16)
