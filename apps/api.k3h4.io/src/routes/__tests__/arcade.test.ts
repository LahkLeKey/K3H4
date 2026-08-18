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
});