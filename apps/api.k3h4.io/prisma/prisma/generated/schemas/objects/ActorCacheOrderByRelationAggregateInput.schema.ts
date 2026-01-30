import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ActorCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ActorCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheOrderByRelationAggregateInput>;
export const ActorCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
