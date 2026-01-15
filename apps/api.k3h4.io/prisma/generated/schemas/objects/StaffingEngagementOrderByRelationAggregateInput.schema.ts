import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StaffingEngagementOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementOrderByRelationAggregateInput>;
export const StaffingEngagementOrderByRelationAggregateInputObjectZodSchema = makeSchema();
