import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../bank-ledger';
import {redeemArcadePrize, startArcadeSession, topUpArcadeCard} from './index';

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

  it('starts a session by debiting the player card', async () => {
    const recordEntry = vi.mocked(recordBankLedgerEntry);
    recordEntry.mockResolvedValue({
      id: 'session-entry',
      createdAt: '2026-08-21T00:00:00.000Z',
    });
    const user = {findUnique: vi.fn()};
    const actor = {
      findFirst: vi.fn()
          .mockResolvedValueOnce({id: 'card-1', userId: 'user-1', type: 'arcade-player-card'})
          .mockResolvedValueOnce({id: 'machine-1', userId: 'user-1', type: 'arcade-machine'}),
    };
    const entity = {
      findMany: vi.fn().mockResolvedValue([
        {direction: 'credit', metadata: {amount: '10.00'}},
      ]),
    };

    const result = await startArcadeSession(
        {user, actor, entity} as any,
        {
          userId: 'user-1',
          cardId: 'card-1',
          machineId: 'machine-1',
          creditsSpent: '3.00',
          score: 42,
        });

    expect(result).toEqual({
      session: {
        id: 'session-entry',
        machineId: 'machine-1',
        cardId: 'card-1',
        creditsSpent: '3.00',
        score: 42,
        startedAt: '2026-08-21T00:00:00.000Z',
      },
      balance: '7.00',
    });
    expect(recordEntry).toHaveBeenCalledWith(
        expect.anything(), expect.objectContaining({
          amount: '3.00',
          balanceAfter: '7.00',
          targetType: 'arcade_machine',
          targetId: 'machine-1',
        }));
  });

  it('redeems an in-stock prize and debits the player card', async () => {
    const recordEntry = vi.mocked(recordBankLedgerEntry);
    recordEntry.mockResolvedValue({
      id: 'redemption-entry',
      createdAt: '2026-08-21T00:00:00.000Z',
    });
    const actor = {
      findFirst: vi.fn()
          .mockResolvedValueOnce({
            id: 'prize-1',
            label: 'Prize',
            metadata: {costCoins: '4.00', stock: 2},
          })
          .mockResolvedValueOnce({id: 'card-1'}),
      update: vi.fn(),
    };
    const entity = {
      findMany: vi.fn().mockResolvedValue([
        {direction: 'credit', metadata: {amount: '10.00'}},
      ]),
    };

    const result = await redeemArcadePrize(
        {actor, entity} as any,
        {userId: 'user-1', prizeId: 'prize-1', cardId: 'card-1', sessionId: 'session-1'});

    expect(result).toEqual({
      redemption: {
        id: 'redemption-entry',
        prizeId: 'prize-1',
        cardId: 'card-1',
        sessionId: 'session-1',
        createdAt: '2026-08-21T00:00:00.000Z',
      },
      balance: '6.00',
      prizeStock: 1,
    });
    expect(actor.update).toHaveBeenCalledWith(expect.objectContaining({
      where: {id: 'prize-1'},
      data: {metadata: {costCoins: '4.00', stock: 1}},
    }));
    expect(recordEntry).toHaveBeenCalledWith(
        expect.anything(), expect.objectContaining({
          amount: '4.00',
          balanceAfter: '6.00',
          targetType: 'arcade_prize',
          targetId: 'prize-1',
        }));
  });
});