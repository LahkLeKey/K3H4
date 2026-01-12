import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const TelemetryEventOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventOrderByRelationAggregateInput>;
export const TelemetryEventOrderByRelationAggregateInputObjectZodSchema = makeSchema();
