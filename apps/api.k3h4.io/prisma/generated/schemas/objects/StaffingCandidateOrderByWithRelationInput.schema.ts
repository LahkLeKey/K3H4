import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StaffingEngagementOrderByWithRelationInputObjectSchema as StaffingEngagementOrderByWithRelationInputObjectSchema } from './StaffingEngagementOrderByWithRelationInput.schema';
import { StaffingRoleOrderByWithRelationInputObjectSchema as StaffingRoleOrderByWithRelationInputObjectSchema } from './StaffingRoleOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema';
import { StaffingPlacementOrderByRelationAggregateInputObjectSchema as StaffingPlacementOrderByRelationAggregateInputObjectSchema } from './StaffingPlacementOrderByRelationAggregateInput.schema';
import { StaffingShiftOrderByRelationAggregateInputObjectSchema as StaffingShiftOrderByRelationAggregateInputObjectSchema } from './StaffingShiftOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  personaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fullName: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stage: SortOrderSchema.optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  desiredRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  availability: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  engagement: z.lazy(() => StaffingEngagementOrderByWithRelationInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleOrderByWithRelationInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementOrderByRelationAggregateInputObjectSchema).optional(),
  shiftsAssigned: z.lazy(() => StaffingShiftOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const StaffingCandidateOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffingCandidateOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateOrderByWithRelationInput>;
export const StaffingCandidateOrderByWithRelationInputObjectZodSchema = makeSchema();
