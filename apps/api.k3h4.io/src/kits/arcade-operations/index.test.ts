import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../bank-ledger';
import {topUpArcadeCard} from './index';

vi.mock('../bank-ledger', () => ({recordBankLedgerEntry: vi.fn()}));

describe('Arcade operations Kit', () => {
  it('moves coins into a player card through two ledger entries', async () => {
    const recordEntry = vi.mocked(recordBankLedgerEntry);
    recordEntry.mockResolvedValue({
      id: 'ledger-entry',
      createdAt: '2026-08-21T00:00:00.000Z',
    });
    const user = {
      findUnique: vi.fn().mockResolvedValue({
        k3h4CoinBalance: new Prisma.Decimal('100.00'),
      }),
      update: vi.fn(),
    };
    const card = {id: 'card-1', label: 'Visitor card'};
    const actor = {findFirst: vi.fn().mockResolvedValue(card)};
    const entity = {findMany: vi.fn().mockResolvedValue([])};

    const result = await topUpArcadeCard(
        {user, actor, entity} as any,
        {userId: 'user-1', cardId: 'card-1', amount: '10.00'});

    expect(result).toEqual({balance: '10.00'});
    expect(recordEntry).toHaveBeenCalledTimes(2);
    expect(recordEntry).toHaveBeenNthCalledWith(
        1, expect.anything(), expect.objectContaining({
          amount: '10.00',
          balanceAfter: '90.00',
          targetId: 'card-1',
        }));
  });
});