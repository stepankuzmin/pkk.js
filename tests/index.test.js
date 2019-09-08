import PKK from '../src';

test('Features query', async () => {
  expect.assertions(1);

  const pkk = new PKK();

  const response = await pkk.queryFeatures(
    { lng: 37.629, lat: 55.7252 },
    { tolerance: 100, limit: 12 },
  );

  expect(response).toMatchObject({
    status: 200,
    features: expect.arrayContaining([
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
  });
});
