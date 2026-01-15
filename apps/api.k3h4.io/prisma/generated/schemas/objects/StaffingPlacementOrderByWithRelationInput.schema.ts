import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StaffingEngagementOrderByWithRelationInputObjectSchema as StaffingEngagementOrderByWithRelationInputObjectSchema } from './StaffingEngagementOrderByWithRelationInput.schema';
import { StaffingRoleOrderByWithRelationInputObjectSchema as StaffingRoleOrderByWithRelationInputObjectSchema } from './StaffingRoleOrderByWithRelationInput.schema';
import { StaffingCandidateOrderByWithRelationInputObjectSchema as StaffingCandidateOrderByWithRelationInputObjectSchema } from './StaffingCandidateOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  candidateId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  personaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startDate: SortOrderSchema.optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  billRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  margin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  engagement: z.lazy(() => StaffingEngagementOrderByWithRelationInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleOrderByWithRelationInputObjectSchema).optional(),
  candidate: z.lazy(() => StaffingCandidateOrderByWithRelationInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const StaffingPlacementOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffingPlacementOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementOrderByWithRelationInput>;
export const StaffingPlacementOrderByWithRelationInputObjectZodSchema = makeSchema();
