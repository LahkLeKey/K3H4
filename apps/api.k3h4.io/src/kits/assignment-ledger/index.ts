import {Prisma, type PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

import {recordBankLedgerEntry} from '../bank-ledger';
import {ENTITY_DIRECTIONS, ENTITY_KINDS} from '../../lib/actor-entity-constants';

type AssignmentTransaction = PrismaClient|Prisma.TransactionClient;

export type PayAssignmentTimecardCommand = {
  userId: string;
  assignmentActorId: string;
  assignmentId: string;
  assignmentTitle: string;
  timecardId: string;
  amount: number|string;
  note?: string;
};

export type PayAssignmentTimecardResult = {
  payout: {
    id: string;
    amount: string;
    note: string;
    status: string;
    invoiceUrl: string;
  };
  balance: string;
};

export type CreateAssignmentCommand = {
  userId: string;
  assignmentActorId: string;
  title: string;
  personaId: string;
  hourlyRate: number|string;
};

export type CreateAssignmentResult = {
  id: string;
  title: string;
  hourlyRate: string;
  personaId: string;
};

export type CreateAssignmentTimecardCommand = {
  assignmentActorId: string;
  assignmentId: string;
  hourlyRate: number|string;
  hours: number|string;
  note?: string;
};

const parseAmount = (value: number|string) => {
  const decimal = new Prisma.Decimal(String(value));
  if (!decimal.greaterThan(0)) throw new Error('Payout amount must be positive');
  return decimal;
};

const readMetadata = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

export async function createAssignment(
    transaction: AssignmentTransaction,
    command: CreateAssignmentCommand,
    ): Promise<CreateAssignmentResult> {
  const hourlyRate = new Prisma.Decimal(String(command.hourlyRate));
  if (!hourlyRate.greaterThan(0))
    throw new Error('hourlyRate must be positive');
  const entity = await transaction.entity.create({
    data: {
      actorId: command.assignmentActorId,
      kind: ENTITY_KINDS.ASSIGNMENT,
      targetType: 'assignment',
      targetId: null,
      name: command.title,
      source: 'k3h4-assignment',
      metadata: {
        title: command.title,
        hourlyRate: hourlyRate.toFixed(2),
        personaId: command.personaId,
      },
    },
  });
  return {
    id: entity.id,
    title: command.title,
    hourlyRate: hourlyRate.toFixed(2),
    personaId: command.personaId,
  };
}

export async function payAssignmentTimecard(
    transaction: AssignmentTransaction,
    command: PayAssignmentTimecardCommand,
    ): Promise<PayAssignmentTimecardResult> {
  const amount = parseAmount(command.amount);
  const user = await transaction.user.findUnique({
    where: {id: command.userId},
    select: {k3h4CoinBalance: true},
  });
  if (!user) throw new Error('User not found');
  const nextBalance = user.k3h4CoinBalance.sub(amount);
  const savedUser = await transaction.user.update({
    where: {id: command.userId},
    data: {k3h4CoinBalance: nextBalance},
  });
  await recordBankLedgerEntry(transaction, {
    userId: command.userId,
    amount: amount.toFixed(2),
    direction: ENTITY_DIRECTIONS.DEBIT,
    kind: ENTITY_KINDS.ASSIGNMENT_PAYOUT,
    note: command.note ?? `Payout for ${command.assignmentTitle}`,
    balanceAfter: savedUser.k3h4CoinBalance.toFixed(2),
    targetType: 'assignment',
    targetId: command.assignmentId,
    name: command.assignmentTitle,
  });

  const note = command.note?.trim() || `Timecard payout ${command.timecardId}`;
  const payoutEntity = await transaction.entity.create({
    data: {
      actorId: command.assignmentActorId,
      kind: ENTITY_KINDS.ASSIGNMENT_PAYOUT,
      targetType: 'assignment',
      targetId: command.assignmentId,
      source: 'k3h4-assignment',
      metadata: {
        amount: amount.toFixed(2),
        note,
        invoiceUrl: `https://invoices.k3h4.local/${
            faker.string.alphanumeric(8).toLowerCase()}`,
        status: 'paid',
      },
    },
  });
  const existing = await transaction.entity.findUnique({
    where: {id: command.timecardId},
    select: {metadata: true},
  });
  const existingMetadata = readMetadata(existing?.metadata);
  await transaction.entity.update({
    where: {id: command.timecardId},
    data: {metadata: {...existingMetadata, status: 'paid'}},
  });

  const metadata = readMetadata(payoutEntity.metadata);
  return {
    payout: {
      id: payoutEntity.id,
      amount: String(metadata.amount ?? amount.toFixed(2)),
      note: String(metadata.note ?? note),
      status: String(metadata.status ?? 'paid'),
      invoiceUrl: String(metadata.invoiceUrl ?? ''),
    },
    balance: savedUser.k3h4CoinBalance.toFixed(2),
  };
}

export async function createAssignmentTimecard(
    transaction: AssignmentTransaction,
    command: CreateAssignmentTimecardCommand) {
  const hours = new Prisma.Decimal(String(command.hours));
  const hourlyRate = new Prisma.Decimal(String(command.hourlyRate));
  if (!hours.greaterThan(0)) throw new Error('hours must be positive');
  const amount = hours.mul(hourlyRate);
  const note = command.note?.trim() || null;
  const entity = await transaction.entity.create({
    data: {
      actorId: command.assignmentActorId,
      kind: ENTITY_KINDS.ASSIGNMENT_TIMECARD,
      targetType: 'assignment',
      targetId: command.assignmentId,
      source: 'k3h4-assignment',
      metadata: {
        hours: hours.toFixed(2),
        amount: amount.toFixed(2),
        note,
        status: 'approved',
      },
    },
  });
  return {
    id: entity.id,
    hours: hours.toFixed(2),
    amount: amount.toFixed(2),
    note,
    status: 'approved',
  };
}