import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StaffingRoleOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StaffingRoleOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleOrderByRelationAggregateInput>;
export const StaffingRoleOrderByRelationAggregateInputObjectZodSchema = makeSchema();
