import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionCreateWithoutUserInputObjectSchema as BankTransactionCreateWithoutUserInputObjectSchema } from './BankTransactionCreateWithoutUserInput.schema';
import { BankTransactionUncheckedCreateWithoutUserInputObjectSchema as BankTransactionUncheckedCreateWithoutUserInputObjectSchema } from './BankTransactionUncheckedCreateWithoutUserInput.schema';
import { BankTransactionCreateOrConnectWithoutUserInputObjectSchema as BankTransactionCreateOrConnectWithoutUserInputObjectSchema } from './BankTransactionCreateOrConnectWithoutUserInput.schema';
import { BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema as BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './BankTransactionUpsertWithWhereUniqueWithoutUserInput.schema';
import { BankTransactionCreateManyUserInputEnvelopeObjectSchema as BankTransactionCreateManyUserInputEnvelopeObjectSchema } from './BankTransactionCreateManyUserInputEnvelope.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './BankTransactionWhereUniqueInput.schema';
import { BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema as BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './BankTransactionUpdateWithWhereUniqueWithoutUserInput.schema';
import { BankTransactionUpdateManyWithWhereWithoutUserInputObjectSchema as BankTransactionUpdateManyWithWhereWithoutUserInputObjectSchema } from './BankTransactionUpdateManyWithWhereWithoutUserInput.schema';
import { BankTransactionScalarWhereInputObjectSchema as BankTransactionScalarWhereInputObjectSchema } from './BankTransactionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BankTransactionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => BankTransactionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BankTransactionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => BankTransactionWhereUniqueInputObjectSchema), z.lazy(() => BankTransactionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BankTransactionWhereUniqueInputObjectSchema), z.lazy(() => BankTransactionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BankTransactionWhereUniqueInputObjectSchema), z.lazy(() => BankTransactionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BankTransactionWhereUniqueInputObjectSchema), z.lazy(() => BankTransactionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BankTransactionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BankTransactionScalarWhereInputObjectSchema), z.lazy(() => BankTransactionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const BankTransactionUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.BankTransactionUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionUncheckedUpdateManyWithoutUserNestedInput>;
export const BankTransactionUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
