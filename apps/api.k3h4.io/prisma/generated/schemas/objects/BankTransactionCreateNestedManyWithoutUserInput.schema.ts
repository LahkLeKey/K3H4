import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionCreateWithoutUserInputObjectSchema as BankTransactionCreateWithoutUserInputObjectSchema } from './BankTransactionCreateWithoutUserInput.schema';
import { BankTransactionUncheckedCreateWithoutUserInputObjectSchema as BankTransactionUncheckedCreateWithoutUserInputObjectSchema } from './BankTransactionUncheckedCreateWithoutUserInput.schema';
import { BankTransactionCreateOrConnectWithoutUserInputObjectSchema as BankTransactionCreateOrConnectWithoutUserInputObjectSchema } from './BankTransactionCreateOrConnectWithoutUserInput.schema';
import { BankTransactionCreateManyUserInputEnvelopeObjectSchema as BankTransactionCreateManyUserInputEnvelopeObjectSchema } from './BankTransactionCreateManyUserInputEnvelope.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './BankTransactionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BankTransactionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => BankTransactionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BankTransactionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => BankTransactionWhereUniqueInputObjectSchema), z.lazy(() => BankTransactionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const BankTransactionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.BankTransactionCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCreateNestedManyWithoutUserInput>;
export const BankTransactionCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
