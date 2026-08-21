import '../../test/vitest-setup';

import {describe, expect, it} from 'vitest';

import {serializeAssignmentList} from './index';

describe('Assignment view Kit', () => {
  it('serializes assignments with nested timecards, payouts, and Persona data', () => {
    const result = serializeAssignmentList(
        [{
          id: 'assignment-1',
          metadata: {title: 'Design gig', hourlyRate: '50.00', personaId: 'p1'},
        }] as any,
        [{
          id: 'timecard-1',
          targetId: 'assignment-1',
          metadata: {hours: '1.50', amount: '75.00', note: 'Work', status: 'approved'},
        }] as any,
        [],
        new Map([['p1', {
          id: 'p1', alias: 'Ada', account: 'ada@example.com', handle: null,
          note: null, tags: [], attributes: [], createdAt: new Date(), updatedAt: new Date(),
        } as any]]));

    expect(result).toEqual([{
      id: 'assignment-1',
      title: 'Design gig',
      hourlyRate: '50.00',
      persona: expect.objectContaining({id: 'p1', alias: 'Ada'}),
      timecards: [{id: 'timecard-1', hours: '1.50', amount: '75.00', note: 'Work', status: 'approved'}],
      payouts: [],
    }]);
  });
});