import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoDirectionStopOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopOrderByRelationAggregateInput>;
export const GeoDirectionStopOrderByRelationAggregateInputObjectZodSchema = makeSchema();
