import PKK, { FEATURE_TYPES } from '../src';

test('Features query', async () => {
  expect.assertions(1);

  const pkk = new PKK({ referer: true });

  const response = await pkk.queryFeatures(
    FEATURE_TYPES.LAND_LOT,
    { lng: 37.629, lat: 55.7252 },
    { tolerance: 100, limit: 12 },
  );

  expect(response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        attrs: expect.objectContaining({
          address: expect.any(String),
          cn: expect.any(String),
          id: expect.any(String),
        }),
        center: expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        }),
        extent: expect.objectContaining({
          xmax: expect.any(Number),
          xmin: expect.any(Number),
          ymax: expect.any(Number),
          ymin: expect.any(Number),
        }),
        sort: expect.any(Number),
        type: expect.any(Number),
      }),
    ]),
  );
});

test('Feature info query', async () => {
  expect.assertions(1);

  const pkk = new PKK({ referer: true });
  const response = await pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985');

  expect(response).toMatchObject({
    attrs: expect.objectContaining({
      adate: expect.any(String),
      address: expect.any(String),
      anno_text: expect.any(String),
      area_type: expect.any(String),
      area_unit: expect.any(String),
      area_value: expect.any(Number),
      cad_cost: expect.any(Number),
      cad_eng_data: expect.objectContaining({}),
      cad_record_date: expect.any(String),
      cad_unit: expect.any(String),
      category_type: expect.any(String),
      cn: expect.any(String),
      date_cost: expect.any(String),
      date_create: expect.any(String),
      id: expect.any(String),
      kvartal: expect.any(String),
      kvartal_cn: expect.any(String),
      okrug: expect.any(String),
      okrug_cn: expect.any(String),
      pubdate: expect.any(String),
      rayon: expect.any(String),
      rayon_cn: expect.any(String),
      reg: expect.any(Number),
      rights_reg: expect.any(Number),
      statecd: expect.any(String),
      util_by_doc: expect.any(String),
      util_code: expect.any(String),
    }),
    center: expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
    extent: expect.objectContaining({
      xmax: expect.any(Number),
      xmin: expect.any(Number),
      ymax: expect.any(Number),
      ymin: expect.any(Number),
    }),
    type: expect.any(Number),
    stat: expect.objectContaining({}),
  });
});

test('Format Feature info', async () => {
  expect.assertions(1);

  const pkk = new PKK({ referer: true });
  const response = await pkk.getFeatureInfo(FEATURE_TYPES.LAND_LOT, '77:1:1013:4985');

  const featureInfo = pkk.formatFeatureInfo(response);

  const expectLabeledValue = expect.objectContaining({
    label: expect.any(String),
    value: expect.anything(),
  });

  expect(featureInfo).toMatchObject({
    attrs: expect.objectContaining({
      adate: expectLabeledValue,
      address: expectLabeledValue,
      anno_text: expectLabeledValue,
      area_type: expectLabeledValue,
      area_value: expectLabeledValue,
      cad_cost: expectLabeledValue,
      cad_eng_data: expectLabeledValue,
      cad_record_date: expectLabeledValue,
      category_type: expectLabeledValue,
      cn: expectLabeledValue,
      date_cost: expectLabeledValue,
      date_create: expectLabeledValue,
      id: expectLabeledValue,
      kvartal: expectLabeledValue,
      kvartal_cn: expectLabeledValue,
      okrug: expectLabeledValue,
      okrug_cn: expectLabeledValue,
      pubdate: expectLabeledValue,
      rayon: expectLabeledValue,
      rayon_cn: expectLabeledValue,
      reg: expectLabeledValue,
      rights_reg: expectLabeledValue,
      statecd: expectLabeledValue,
      util_by_doc: expectLabeledValue,
      util_code: expectLabeledValue,
    }),
    center: expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
    extent: expect.objectContaining({
      xmax: expect.any(Number),
      xmin: expect.any(Number),
      ymax: expect.any(Number),
      ymin: expect.any(Number),
    }),
    type: expect.any(Number),
    stat: expect.objectContaining({}),
  });
});
