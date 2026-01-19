import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const OsrmCacheEntryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryOrderByRelationAggregateInput>;
export const OsrmCacheEntryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
