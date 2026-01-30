import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  statusCode: SortOrderSchema.optional()
}).strict();
export const MaptilerCacheEntryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryAvgOrderByAggregateInput>;
export const MaptilerCacheEntryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
