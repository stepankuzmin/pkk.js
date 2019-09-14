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
-   [Feature](#feature)
    -   [Properties](#properties)
-   [FeatureAttrs](#featureattrs)
    -   [Properties](#properties-1)
-   [FEATURE_TYPES](#feature_types)
    -   [Parameters](#parameters-3)

### PKK

PKK API Client

#### Parameters

-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** client config (optional, default `defaultConfig`)
    -   `config.baseURL` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PKK base URL (optional, default `'https://pkk5.rosreestr.ru/'`)
    -   `config.featuresURL` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PKK features API URL (optional, default `'/api/features/'`)
    -   `config.referer` **([Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** referer header (optional, default `false`)

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
  FEATURE_TYPES.LAND_PLOT,
  { lng: 37.629, lat: 55.7252 },
  { tolerance: 100, limit: 12 }
).then(features => {
  console.log(features);
});
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Features>>** response

#### getFeatureInfo

Query PKK feature info

##### Parameters

-   `typeId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** feature type id
-   `featureId`  
-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** feature id

##### Examples

```javascript
import PKK, { FEATURE_TYPES } from 'pkk';

const pkk = new PKK();

pkk.getFeatureInfo(FEATURE_TYPES.LAND_PLOT, '77:1:1013:4985')
  .then(featureInfo => {
    console.log(featureInfo);
  });
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Feature](#feature)>** response

### Feature

Feature

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `attrs` **[FeatureAttrs](#featureattrs)** 
-   `center` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `center.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `center.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `extent` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `extent.xmax` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `extent.xmin` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `extent.ymax` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `extent.ymin` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `sort` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 
-   `type` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### FeatureAttrs

Feature attributes

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** feature id
-   `cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** cadastral number
-   `address` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `adate` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `anno_text` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `area_type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `area_unit` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `area_value` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 
-   `cad_cost` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 
-   `cad_eng_dat` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
-   `cad_record_date` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `cad_unit` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `category_type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `date_cost` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `date_create` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `kvartal` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `kvartal_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `okrug` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `okrug_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `pubdate` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `rayon` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `rayon_cn` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `reg` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 
-   `rights_reg` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 
-   `statecd` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `util_by_doc` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `util_code` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 

### FEATURE_TYPES

Типы объектов

#### Parameters

-   `FEATURE_TYPES` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Типы объектов
    -   `FEATURE_TYPES.LAND_PLOT` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Земельные участки
    -   `FEATURE_TYPES.LAND_QUARTER` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Кварталы
    -   `FEATURE_TYPES.LAND_AREA` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Районы
    -   `FEATURE_TYPES.LAND_DISTRICT` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Округи
    -   `FEATURE_TYPES.CCO` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ОКСы
    -   `FEATURE_TYPES.TERRITORIAL_AREA` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Территориальные зоны
    -   `FEATURE_TYPES.BOUNDARY` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Границы
    -   `FEATURE_TYPES.BOUNDARY_REFERENCE_NETWORK` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ОМС
    -   `FEATURE_TYPES.USE_RESTRICTED_ZONE` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** ЗОУИТы
    -   `FEATURE_TYPES.FORESTRY` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Лесничества и лесопарки
