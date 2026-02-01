import {describe, expect, it} from 'vitest';

import {computeIncludeHash, DEFAULT_INCLUDE_FLAGS, parseFreshFlag, parseIncludeFlags, parseOrigin, parsePoiId,} from '../poi-enrich/parse';

describe('poi enrich parse helpers', () => {
  it('parses valid poi ids', () => {
    expect(parsePoiId('node/123')).toEqual({type: 'node', id: 123});
    expect(parsePoiId('relation:456')).toEqual({type: 'relation', id: 456});
  });

  it('rejects invalid poi ids', () => {
    expect(parsePoiId('')).toBeNull();
    expect(parsePoiId('node/abc')).toBeNull();
    expect(parsePoiId('foo/123')).toBeNull();
  });

  it('returns default flags when none provided', () => {
    expect(parseIncludeFlags(undefined)).toEqual(DEFAULT_INCLUDE_FLAGS);
  });

  it('honors explicit include flags and mirrors photos to description', () => {
    const result = parseIncludeFlags(['photos', 'route']);
    expect(result.photos).toBe(true);
    expect(result.description).toBe(true);
    expect(result.route).toBe(true);
    expect(result.address).toBe(false);
  });

  it('detects fresh flag truthy values', () => {
    expect(parseFreshFlag(true)).toBe(true);
    expect(parseFreshFlag('true')).toBe(true);
    expect(parseFreshFlag('1')).toBe(true);
    expect(parseFreshFlag('false')).toBe(false);
  });

  it('resolves origin from various query keys', () => {
    const byOrigin = parseOrigin({originLat: 1.1, originLon: 2.2});
    expect(byOrigin).toEqual({lat: 1.1, lon: 2.2});
    const byAlt = parseOrigin({lat: 3, longitude: 4});
    expect(byAlt).toEqual({lat: 3, lon: 4});
    expect(parseOrigin({lat: 'bad'})).toBeNull();
  });

  it('computes stable include hashes', () => {
    const flags = DEFAULT_INCLUDE_FLAGS;
    const hashA = computeIncludeHash(flags, {lat: 0, lon: 0}, 'driving');
    const hashB = computeIncludeHash(flags, {lat: 0, lon: 0}, 'driving');
    const hashC = computeIncludeHash(flags, {lat: 0, lon: 0}, 'walking');
    expect(hashA).toBe(hashB);
    expect(hashC).not.toBe(hashA);
  });
});
