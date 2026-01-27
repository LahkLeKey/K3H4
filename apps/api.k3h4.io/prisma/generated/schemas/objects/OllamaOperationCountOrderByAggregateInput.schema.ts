import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  temperature: SortOrderSchema.optional(),
  systemPrompt: SortOrderSchema.optional(),
  requestBody: SortOrderSchema.optional(),
  responseBody: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  errorMessage: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const OllamaOperationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCountOrderByAggregateInput>;
export const OllamaOperationCountOrderByAggregateInputObjectZodSchema = makeSchema();
