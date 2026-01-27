import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoDirectionSegmentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentOrderByRelationAggregateInput>;
export const GeoDirectionSegmentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
