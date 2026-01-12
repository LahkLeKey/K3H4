import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './BankTransactionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => BankTransactionWhereInputObjectSchema).optional(),
  some: z.lazy(() => BankTransactionWhereInputObjectSchema).optional(),
  none: z.lazy(() => BankTransactionWhereInputObjectSchema).optional()
}).strict();
export const BankTransactionListRelationFilterObjectSchema: z.ZodType<Prisma.BankTransactionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionListRelationFilter>;
export const BankTransactionListRelationFilterObjectZodSchema = makeSchema();
