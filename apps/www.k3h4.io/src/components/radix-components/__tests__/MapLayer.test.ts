import {describe, expect, it} from 'vitest';

import {resolveMapStyleUrl} from '../MapLayer';

describe('resolveMapStyleUrl', () => {
  it('uses the repo\'s own map style instead of the green external fallback',
     () => {
       expect(resolveMapStyleUrl('https://app.test', null))
           .toBe(
               'https://app.test/maptiler/json?path=/maps/hybrid/style.json',
           );
     });

  it('honors the bootstrapped map config when available', () => {
    expect(
        resolveMapStyleUrl('https://app.test', {
          stylePath: '/maps/override/style.json',
          vectorTilePath: '/tiles/v3/{z}/{x}/{y}.pbf',
          terrainTilePath: '/tiles/terrain-rgb-v2/{z}/{x}/{y}.png',
        }),
        )
        .toBe('https://app.test/maptiler/json?path=/maps/override/style.json');
  });
});
