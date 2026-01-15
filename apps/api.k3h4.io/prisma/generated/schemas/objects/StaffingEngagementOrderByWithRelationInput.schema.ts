import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StaffingRoleOrderByRelationAggregateInputObjectSchema as StaffingRoleOrderByRelationAggregateInputObjectSchema } from './StaffingRoleOrderByRelationAggregateInput.schema';
import { StaffingCandidateOrderByRelationAggregateInputObjectSchema as StaffingCandidateOrderByRelationAggregateInputObjectSchema } from './StaffingCandidateOrderByRelationAggregateInput.schema';
import { StaffingPlacementOrderByRelationAggregateInputObjectSchema as StaffingPlacementOrderByRelationAggregateInputObjectSchema } from './StaffingPlacementOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  client: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  budget: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  forecast: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  roles: z.lazy(() => StaffingRoleOrderByRelationAggregateInputObjectSchema).optional(),
  candidates: z.lazy(() => StaffingCandidateOrderByRelationAggregateInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const StaffingEngagementOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffingEngagementOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementOrderByWithRelationInput>;
export const StaffingEngagementOrderByWithRelationInputObjectZodSchema = makeSchema();
