import '../../test/vitest-setup';

import {describe, expect, it} from 'vitest';

import {buildPersonaCompatibilityPayload} from './index';

describe('Persona matching Kit', () => {
  it('builds deterministic Jaccard compatibility payloads', () => {
    const payload = buildPersonaCompatibilityPayload([
      {
        id: 'persona-1',
        alias: 'Ada Lovelace',
        account: 'ada@example.com',
        handle: '@ada',
        note: null,
        tags: ['Fintech'],
        attributes: [{
          id: 'attribute-1',
          category: 'Industry',
          value: 'Payments',
          weight: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'persona-2',
        alias: 'Grace Hopper',
        account: 'grace@example.com',
        handle: '@grace',
        note: null,
        tags: ['Fintech'],
        attributes: [{
          id: 'attribute-2',
          category: 'Industry',
          value: 'Logistics',
          weight: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    expect(payload).toEqual([{
      sourceId: 'persona-1',
      targetId: 'persona-2',
      metadata: {
        sourceId: 'persona-1',
        targetId: 'persona-2',
        jaccardScore: 0.1429,
        intersectionCount: 1,
        unionCount: 7,
        overlappingTokens: ['fintech'],
        status: 'ACTIVE',
      },
    }]);
  });
});