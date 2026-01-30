import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  temperature: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional()
}).strict();
export const OllamaOperationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationSumOrderByAggregateInput>;
export const OllamaOperationSumOrderByAggregateInputObjectZodSchema = makeSchema();
