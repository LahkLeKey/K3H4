import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './BankTransactionWhereUniqueInput.schema';
import { BankTransactionCreateWithoutUserInputObjectSchema as BankTransactionCreateWithoutUserInputObjectSchema } from './BankTransactionCreateWithoutUserInput.schema';
import { BankTransactionUncheckedCreateWithoutUserInputObjectSchema as BankTransactionUncheckedCreateWithoutUserInputObjectSchema } from './BankTransactionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BankTransactionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BankTransactionCreateWithoutUserInputObjectSchema), z.lazy(() => BankTransactionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const BankTransactionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.BankTransactionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCreateOrConnectWithoutUserInput>;
export const BankTransactionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
