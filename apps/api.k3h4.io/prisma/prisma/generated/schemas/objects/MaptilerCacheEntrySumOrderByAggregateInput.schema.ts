import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  statusCode: SortOrderSchema.optional()
}).strict();
export const MaptilerCacheEntrySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntrySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntrySumOrderByAggregateInput>;
export const MaptilerCacheEntrySumOrderByAggregateInputObjectZodSchema = makeSchema();
