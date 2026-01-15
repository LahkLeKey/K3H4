import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StaffingRoleOrderByWithRelationInputObjectSchema as StaffingRoleOrderByWithRelationInputObjectSchema } from './StaffingRoleOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema';
import { StaffingCandidateOrderByWithRelationInputObjectSchema as StaffingCandidateOrderByWithRelationInputObjectSchema } from './StaffingCandidateOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startsAt: SortOrderSchema.optional(),
  endsAt: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  coverageStatus: SortOrderSchema.optional(),
  assignedPersonaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  assignedCandidateId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleOrderByWithRelationInputObjectSchema).optional(),
  assignedPersona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const StaffingShiftOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffingShiftOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftOrderByWithRelationInput>;
export const StaffingShiftOrderByWithRelationInputObjectZodSchema = makeSchema();
