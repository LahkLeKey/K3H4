import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BankTransactionCountOrderByAggregateInputObjectSchema as BankTransactionCountOrderByAggregateInputObjectSchema } from './BankTransactionCountOrderByAggregateInput.schema';
import { BankTransactionAvgOrderByAggregateInputObjectSchema as BankTransactionAvgOrderByAggregateInputObjectSchema } from './BankTransactionAvgOrderByAggregateInput.schema';
import { BankTransactionMaxOrderByAggregateInputObjectSchema as BankTransactionMaxOrderByAggregateInputObjectSchema } from './BankTransactionMaxOrderByAggregateInput.schema';
import { BankTransactionMinOrderByAggregateInputObjectSchema as BankTransactionMinOrderByAggregateInputObjectSchema } from './BankTransactionMinOrderByAggregateInput.schema';
import { BankTransactionSumOrderByAggregateInputObjectSchema as BankTransactionSumOrderByAggregateInputObjectSchema } from './BankTransactionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  balanceAfter: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => BankTransactionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BankTransactionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BankTransactionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BankTransactionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BankTransactionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BankTransactionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BankTransactionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionOrderByWithAggregationInput>;
export const BankTransactionOrderByWithAggregationInputObjectZodSchema = makeSchema();
