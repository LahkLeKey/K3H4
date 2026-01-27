import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AiInsightOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AiInsightOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightOrderByRelationAggregateInput>;
export const AiInsightOrderByRelationAggregateInputObjectZodSchema = makeSchema();
