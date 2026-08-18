import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankTransactionEntity} from '../../actors/Bank/Bank';

import {BankLedgerValidationError, changeBankBalance, getBankBalance, listBankTransactions, recordBankLedgerEntry} from './index';

vi.mock('../../actors/Bank/Bank', () => ({
  buildBankTransactionWhere: vi.fn((actorId, options) => ({
    actorId,
    ...(options?.from || options?.to ? {createdAt: {}} : {}),
  })),
  recordBankTransactionEntity: vi.fn(),
}));

describe('Bank ledger Kit', () => {
  it('returns a serialized balance', async () => {
    const result = await getBankBalance({
      user: {
        findUnique: vi.fn().mockResolvedValue(
            {k3h4CoinBalance: new Prisma.Decimal('12.5')}),
      },
    } as any, 'user-1');

    expect(result).toEqual({balance: '12.50'});
  });

  it('rejects ambiguous balance changes through its interface', async () => {
    await expect(changeBankBalance({} as any, {
      userId: 'user-1',
      delta: 10,
      set: 50,
    })).rejects.toEqual(
        new BankLedgerValidationError('Choose either delta or set'));
  });

  it('records an entry in the supplied host transaction without returning it',
     async () => {
       const transaction = {} as any;
       const createdAt = new Date('2026-08-18T00:00:00.000Z');
       vi.mocked(recordBankTransactionEntity)
           .mockResolvedValue({id: 'entry', createdAt} as any);

       await expect(recordBankLedgerEntry(transaction, {
         userId: 'user-1',
         amount: '10.00',
         direction: 'debit',
         kind: 'freight_payment',
         balanceAfter: '90.00',
         targetType: 'freight_load',
         targetId: 'load-1',
      })).resolves.toEqual({id: 'entry', createdAt: createdAt.toISOString()});

       expect(recordBankTransactionEntity).toHaveBeenCalledWith(
           transaction, expect.objectContaining({
             userId: 'user-1',
             amount: new Prisma.Decimal('10.00'),
             balanceAfter: new Prisma.Decimal('90.00'),
             targetType: 'freight_load',
             targetId: 'load-1',
           }));
     });

  it('normalizes transaction-list paging and serializes records', async () => {
    const entity = {
      count: vi.fn().mockResolvedValue(1),
      findMany: vi.fn().mockResolvedValue([{
        id: 'transaction-1',
        direction: 'CREDIT',
        kind: 'DEPOSIT',
        metadata: {
          amount: '5.00',
          balanceAfter: '105.00',
          direction: 'credit',
          kind: 'deposit',
          note: null,
        },
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
      }]),
    };
    const result = await listBankTransactions({
      actor: {findFirst: vi.fn().mockResolvedValue({id: 'bank-actor'})},
      entity,
    } as any, {
      userId: 'user-1',
      limit: '999',
      offset: '-5',
      direction: 'credit',
    });

    expect(result).toMatchObject({
      total: 1,
      request: {limit: 100, offset: 0, direction: 'credit'},
      transactions: [{
        id: 'transaction-1',
        amount: '5.00',
        balanceAfter: '105.00',
        direction: 'credit',
        kind: 'deposit',
      }],
    });
    expect(entity.findMany).toHaveBeenCalledWith(expect.objectContaining({
      skip: 0,
      take: 100,
    }));
  });
});