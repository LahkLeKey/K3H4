import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const OllamaOperationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationOrderByRelationAggregateInput>;
export const OllamaOperationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
