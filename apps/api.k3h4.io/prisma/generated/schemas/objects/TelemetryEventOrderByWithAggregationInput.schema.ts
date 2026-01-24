import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TelemetryEventCountOrderByAggregateInputObjectSchema as TelemetryEventCountOrderByAggregateInputObjectSchema } from './TelemetryEventCountOrderByAggregateInput.schema';
import { TelemetryEventAvgOrderByAggregateInputObjectSchema as TelemetryEventAvgOrderByAggregateInputObjectSchema } from './TelemetryEventAvgOrderByAggregateInput.schema';
import { TelemetryEventMaxOrderByAggregateInputObjectSchema as TelemetryEventMaxOrderByAggregateInputObjectSchema } from './TelemetryEventMaxOrderByAggregateInput.schema';
import { TelemetryEventMinOrderByAggregateInputObjectSchema as TelemetryEventMinOrderByAggregateInputObjectSchema } from './TelemetryEventMinOrderByAggregateInput.schema';
import { TelemetryEventSumOrderByAggregateInputObjectSchema as TelemetryEventSumOrderByAggregateInputObjectSchema } from './TelemetryEventSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessionId: SortOrderSchema.optional(),
  eventType: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  path: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  durationMs: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  error: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => TelemetryEventCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => TelemetryEventAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TelemetryEventMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TelemetryEventMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => TelemetryEventSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TelemetryEventOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TelemetryEventOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventOrderByWithAggregationInput>;
export const TelemetryEventOrderByWithAggregationInputObjectZodSchema = makeSchema();
