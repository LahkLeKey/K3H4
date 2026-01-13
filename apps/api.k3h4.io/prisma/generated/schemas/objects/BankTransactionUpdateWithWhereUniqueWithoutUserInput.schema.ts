import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './BankTransactionWhereUniqueInput.schema';
import { BankTransactionUpdateWithoutUserInputObjectSchema as BankTransactionUpdateWithoutUserInputObjectSchema } from './BankTransactionUpdateWithoutUserInput.schema';
import { BankTransactionUncheckedUpdateWithoutUserInputObjectSchema as BankTransactionUncheckedUpdateWithoutUserInputObjectSchema } from './BankTransactionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BankTransactionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => BankTransactionUpdateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.BankTransactionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionUpdateWithWhereUniqueWithoutUserInput>;
export const BankTransactionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
