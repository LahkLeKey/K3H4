import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionScalarWhereInputObjectSchema as BankTransactionScalarWhereInputObjectSchema } from './BankTransactionScalarWhereInput.schema';
import { BankTransactionUpdateManyMutationInputObjectSchema as BankTransactionUpdateManyMutationInputObjectSchema } from './BankTransactionUpdateManyMutationInput.schema';
import { BankTransactionUncheckedUpdateManyWithoutUserInputObjectSchema as BankTransactionUncheckedUpdateManyWithoutUserInputObjectSchema } from './BankTransactionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BankTransactionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => BankTransactionUpdateManyMutationInputObjectSchema), z.lazy(() => BankTransactionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const BankTransactionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.BankTransactionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionUpdateManyWithWhereWithoutUserInput>;
export const BankTransactionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
