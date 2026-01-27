import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  temperature: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional()
}).strict();
export const OllamaOperationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationAvgOrderByAggregateInput>;
export const OllamaOperationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
