import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../../kits/bank-ledger';
import {registerArcadeRoutes} from '../arcade';
import {type RecordTelemetryFn} from '../types';

vi.mock('../../kits/bank-ledger', () => ({
  recordBankLedgerEntry: vi.fn(),
}));

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const recordBankLedgerEntryMock = vi.mocked(recordBankLedgerEntry);

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: 'user-1'};
  });
  registerArcadeRoutes(server as any, prisma, recordTelemetry);
  return server;
}

describe('arcade routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    recordBankLedgerEntryMock.mockReset();
    recordBankLedgerEntryMock.mockResolvedValue({
      id: 'ledger-entry-1',
      createdAt: '2026-08-18T00:00:00.000Z',
    });
  });

  it('tops up a card through the Bank ledger Kit inside its transaction',
     async () => {
       const user = {
         findUnique: vi.fn().mockResolvedValue(
             {k3h4CoinBalance: new Prisma.Decimal('100.00')}),
         update: vi.fn(),
       };
       const actor = {
         findFirst: vi.fn().mockResolvedValue({
           id: 'card-1',
           label: 'Visitor card',
         }),
       };
       const entity = {findMany: vi.fn().mockResolvedValue([])};
       const prisma = {
         user,
         actor,
         entity,
         $transaction: vi.fn(async (callback) =>
           callback({user, actor, entity})),
       };
       const server = buildServer(prisma);

       const response = await server.inject({
         method: 'POST',
         url: '/arcade/cards/card-1/actions/topup',
         payload: {amount: 10},
       });

       expect(response.statusCode).toBe(200);
       expect(response.json()).toEqual({balance: '10.00'});
       expect(recordBankLedgerEntryMock).toHaveBeenCalledTimes(2);
       expect(recordBankLedgerEntryMock).toHaveBeenNthCalledWith(
           1, expect.anything(), expect.objectContaining({
             amount: '10.00',
             balanceAfter: '90.00',
             targetType: 'arcade_card',
             targetId: 'card-1',
           }));
       expect(recordTelemetry).toHaveBeenCalledWith(
           expect.anything(),
           expect.objectContaining({eventType: 'arcade.card.topup'}));
     });

  it('starts a session through the Arcade Kit', async () => {
    const actor = {
      findFirst: vi.fn()
          .mockResolvedValueOnce({id: 'card-1'})
          .mockResolvedValueOnce({id: 'machine-1'}),
    };
    const entity = {
      findMany: vi.fn().mockResolvedValue([
        {direction: 'credit', metadata: {amount: '10.00'}},
      ]),
    };
    const prisma = {
      actor,
      entity,
      $transaction: vi.fn(async (callback) => callback({actor, entity})),
    };
    const server = buildServer(prisma);

    const response = await server.inject({
      method: 'POST',
      url: '/arcade/sessions',
      payload: {cardId: 'card-1', machineId: 'machine-1', creditsSpent: 3, score: 9},
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      session: {
        id: 'ledger-entry-1',
        machineId: 'machine-1',
        cardId: 'card-1',
        creditsSpent: '3.00',
        score: 9,
        startedAt: '2026-08-18T00:00:00.000Z',
      },
      balance: '7.00',
    });
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.session.start'}));
  });

  it('redeems a prize through the Arcade Kit and decrements stock', async () => {
    const actor = {
      findFirst: vi.fn()
          .mockResolvedValueOnce({
            id: 'prize-1',
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
    const prisma = {
      actor,
      entity,
      $transaction: vi.fn(async (callback) => callback({actor, entity})),
    };
    const server = buildServer(prisma);

    const response = await server.inject({
      method: 'POST',
      url: '/arcade/prizes/prize-1/actions/redeem',
      payload: {cardId: 'card-1', sessionId: 'session-1'},
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      redemption: {
        id: 'ledger-entry-1',
        prizeId: 'prize-1',
        cardId: 'card-1',
        sessionId: 'session-1',
        createdAt: '2026-08-18T00:00:00.000Z',
      },
      balance: '6.00',
      prizeStock: 1,
    });
    expect(actor.update).toHaveBeenCalledWith(expect.objectContaining({
      where: {id: 'prize-1'},
      data: {metadata: {costCoins: '4.00', stock: 1}},
    }));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.prize.redeem'}));
  });

  it('lists the arcade overview and records telemetry', async () => {
    const prisma = {
      actor: {findMany: vi.fn().mockResolvedValue([])},
      entity: {findMany: vi.fn().mockResolvedValue([])},
    };
    const server = buildServer(prisma);
    const response = await server.inject({
      method: 'GET',
      url: '/arcade/overview',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      machines: [], cards: [], prizes: [], sessions: [], redemptions: [],
    });
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.overview.fetch'}));
  });

  it('creates a machine, card, and prize through Kit commands', async () => {
    const actor = {
      create: vi.fn()
          .mockResolvedValueOnce({id: 'machine-1', label: 'Cabinet', metadata: {status: 'idle'}, createdAt: new Date()})
          .mockResolvedValueOnce({id: 'card-1', label: 'Visitor card', metadata: {}, createdAt: new Date()})
          .mockResolvedValueOnce({id: 'prize-1', label: 'Prize', metadata: {costCoins: '4.00', stock: 2}}),
    };
    const server = buildServer({actor});

    const machine = await server.inject({
      method: 'POST',
      url: '/arcade/machines',
      payload: {name: 'Cabinet'},
    });
    const card = await server.inject({
      method: 'POST',
      url: '/arcade/cards',
      payload: {label: 'Visitor card'},
    });
    const prize = await server.inject({
      method: 'POST',
      url: '/arcade/prizes',
      payload: {name: 'Prize', costCoins: 4, stock: 2},
    });

    expect(machine.statusCode).toBe(200);
    expect(machine.json().machine.id).toBe('machine-1');
    expect(card.statusCode).toBe(200);
    expect(card.json().card.id).toBe('card-1');
    expect(prize.statusCode).toBe(200);
    expect(prize.json().prize.id).toBe('prize-1');
    expect(actor.create).toHaveBeenCalledTimes(3);
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.machine.create'}));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.card.create'}));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'arcade.prize.create'}));
  });
});