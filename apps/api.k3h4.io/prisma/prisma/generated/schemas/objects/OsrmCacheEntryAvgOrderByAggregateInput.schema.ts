import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  statusCode: SortOrderSchema.optional()
}).strict();
export const OsrmCacheEntryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryAvgOrderByAggregateInput>;
export const OsrmCacheEntryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
