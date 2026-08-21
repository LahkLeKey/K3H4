import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../bank-ledger';
import {payAssignmentTimecard} from './index';

vi.mock('../bank-ledger', () => ({recordBankLedgerEntry: vi.fn()}));

describe('Assignment ledger Kit', () => {
  it('pays a timecard and records the debit atomically', async () => {
    vi.mocked(recordBankLedgerEntry).mockResolvedValue({
      id: 'ledger-entry-1',
      createdAt: '2026-08-21T00:00:00.000Z',
    });
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({
        k3h4CoinBalance: new Prisma.Decimal('200.00'),
      }),
      update: vi.fn().mockResolvedValue({
        k3h4CoinBalance: new Prisma.Decimal('100.00'),
      }),
    };
    const txEntity = {
      create: vi.fn().mockResolvedValue({
        id: 'payout-1',
        metadata: {amount: '100.00', note: 'Pay now', status: 'paid'},
      }),
      findUnique: vi.fn().mockResolvedValue({metadata: {status: 'approved'}}),
      update: vi.fn(),
    };

    const result = await payAssignmentTimecard(
        {user: txUser, entity: txEntity} as any,
        {
          userId: 'user-1',
          assignmentActorId: 'assignment-actor-1',
          assignmentId: 'assignment-1',
          assignmentTitle: 'Design gig',
          timecardId: 'timecard-1',
          amount: '100.00',
          note: 'Pay now',
        });

    expect(result).toEqual({
      payout: {
        id: 'payout-1',
        amount: '100.00',
        note: 'Pay now',
        status: 'paid',
        invoiceUrl: expect.any(String),
      },
      balance: '100.00',
    });
    expect(recordBankLedgerEntry).toHaveBeenCalledWith(
        expect.anything(), expect.objectContaining({
          amount: '100.00',
          balanceAfter: '100.00',
          targetType: 'assignment',
          targetId: 'assignment-1',
        }));
    expect(txEntity.update).toHaveBeenCalledWith(expect.objectContaining({
      where: {id: 'timecard-1'},
      data: {metadata: {status: 'paid'}},
    }));
  });
});