import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryOrderByRelationAggregateInput>;
export const MaptilerCacheEntryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
