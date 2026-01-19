import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  statusCode: SortOrderSchema.optional()
}).strict();
export const OsrmCacheEntrySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntrySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntrySumOrderByAggregateInput>;
export const OsrmCacheEntrySumOrderByAggregateInputObjectZodSchema = makeSchema();
