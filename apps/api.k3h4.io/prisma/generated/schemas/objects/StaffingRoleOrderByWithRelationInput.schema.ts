import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StaffingEngagementOrderByWithRelationInputObjectSchema as StaffingEngagementOrderByWithRelationInputObjectSchema } from './StaffingEngagementOrderByWithRelationInput.schema';
import { StaffingCandidateOrderByRelationAggregateInputObjectSchema as StaffingCandidateOrderByRelationAggregateInputObjectSchema } from './StaffingCandidateOrderByRelationAggregateInput.schema';
import { StaffingShiftOrderByRelationAggregateInputObjectSchema as StaffingShiftOrderByRelationAggregateInputObjectSchema } from './StaffingShiftOrderByRelationAggregateInput.schema';
import { StaffingPlacementOrderByRelationAggregateInputObjectSchema as StaffingPlacementOrderByRelationAggregateInputObjectSchema } from './StaffingPlacementOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  modality: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  openings: SortOrderSchema.optional(),
  filled: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  rateMin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rateMax: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  billRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  skills: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  engagement: z.lazy(() => StaffingEngagementOrderByWithRelationInputObjectSchema).optional(),
  candidates: z.lazy(() => StaffingCandidateOrderByRelationAggregateInputObjectSchema).optional(),
  shifts: z.lazy(() => StaffingShiftOrderByRelationAggregateInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const StaffingRoleOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffingRoleOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleOrderByWithRelationInput>;
export const StaffingRoleOrderByWithRelationInputObjectZodSchema = makeSchema();
