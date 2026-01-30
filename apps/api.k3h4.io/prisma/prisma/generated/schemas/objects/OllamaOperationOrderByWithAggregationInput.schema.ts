import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OllamaOperationCountOrderByAggregateInputObjectSchema as OllamaOperationCountOrderByAggregateInputObjectSchema } from './OllamaOperationCountOrderByAggregateInput.schema';
import { OllamaOperationAvgOrderByAggregateInputObjectSchema as OllamaOperationAvgOrderByAggregateInputObjectSchema } from './OllamaOperationAvgOrderByAggregateInput.schema';
import { OllamaOperationMaxOrderByAggregateInputObjectSchema as OllamaOperationMaxOrderByAggregateInputObjectSchema } from './OllamaOperationMaxOrderByAggregateInput.schema';
import { OllamaOperationMinOrderByAggregateInputObjectSchema as OllamaOperationMinOrderByAggregateInputObjectSchema } from './OllamaOperationMinOrderByAggregateInput.schema';
import { OllamaOperationSumOrderByAggregateInputObjectSchema as OllamaOperationSumOrderByAggregateInputObjectSchema } from './OllamaOperationSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  sessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  model: SortOrderSchema.optional(),
  temperature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  systemPrompt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  requestBody: SortOrderSchema.optional(),
  responseBody: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  errorMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => OllamaOperationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OllamaOperationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OllamaOperationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OllamaOperationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OllamaOperationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OllamaOperationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OllamaOperationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationOrderByWithAggregationInput>;
export const OllamaOperationOrderByWithAggregationInputObjectZodSchema = makeSchema();
