import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../bank-ledger';
import {createAssignment, createAssignmentTimecard, payAssignmentTimecard} from './index';

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

  it('creates an assignment for a Persona through the Kit command', async () => {
    const entity = {
      create: vi.fn().mockResolvedValue({
        id: 'assignment-1',
        metadata: {title: 'Design gig', hourlyRate: '50.00', personaId: 'p1'},
      }),
    };
    const result = await createAssignment({actor: {}, entity} as any, {
      userId: 'user-1',
      assignmentActorId: 'assignment-actor-1',
      title: 'Design gig',
      personaId: 'p1',
      hourlyRate: '50.00',
    });

    expect(result).toEqual({
      id: 'assignment-1',
      title: 'Design gig',
      hourlyRate: '50.00',
      personaId: 'p1',
    });
    expect(entity.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        actorId: 'assignment-actor-1',
        targetId: null,
        metadata: {title: 'Design gig', hourlyRate: '50.00', personaId: 'p1'},
      }),
    }));
  });

  it('creates a timecard and calculates its amount from the hourly rate', async () => {
    const entity = {
      create: vi.fn().mockResolvedValue({id: 'timecard-1'}),
    };
    const result = await createAssignmentTimecard({entity} as any, {
      assignmentActorId: 'assignment-actor-1',
      assignmentId: 'assignment-1',
      hourlyRate: '50.00',
      hours: '1.50',
      note: 'Design work',
    });

    expect(result).toEqual({
      id: 'timecard-1',
      hours: '1.50',
      amount: '75.00',
      note: 'Design work',
      status: 'approved',
    });
    expect(entity.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        targetId: 'assignment-1',
        metadata: {
          hours: '1.50', amount: '75.00', note: 'Design work', status: 'approved',
        },
      }),
    }));
  });
});