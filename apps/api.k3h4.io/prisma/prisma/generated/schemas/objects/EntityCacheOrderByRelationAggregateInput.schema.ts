import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const EntityCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.EntityCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheOrderByRelationAggregateInput>;
export const EntityCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
