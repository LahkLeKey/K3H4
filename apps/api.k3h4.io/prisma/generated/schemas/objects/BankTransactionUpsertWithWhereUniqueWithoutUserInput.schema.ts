import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './BankTransactionWhereUniqueInput.schema';
import { BankTransactionUpdateWithoutUserInputObjectSchema as BankTransactionUpdateWithoutUserInputObjectSchema } from './BankTransactionUpdateWithoutUserInput.schema';
import { BankTransactionUncheckedUpdateWithoutUserInputObjectSchema as BankTransactionUncheckedUpdateWithoutUserInputObjectSchema } from './BankTransactionUncheckedUpdateWithoutUserInput.schema';
import { BankTransactionCreateWithoutUserInputObjectSchema as BankTransactionCreateWithoutUserInputObjectSchema } from './BankTransactionCreateWithoutUserInput.schema';
import { BankTransactionUncheckedCreateWithoutUserInputObjectSchema as BankTransactionUncheckedCreateWithoutUserInputObjectSchema } from './BankTransactionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BankTransactionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => BankTransactionUpdateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.BankTransactionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionUpsertWithWhereUniqueWithoutUserInput>;
export const BankTransactionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
