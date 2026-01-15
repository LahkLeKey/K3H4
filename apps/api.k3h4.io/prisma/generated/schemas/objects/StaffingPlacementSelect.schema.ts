import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingEngagementArgsObjectSchema as StaffingEngagementArgsObjectSchema } from './StaffingEngagementArgs.schema';
import { StaffingRoleArgsObjectSchema as StaffingRoleArgsObjectSchema } from './StaffingRoleArgs.schema';
import { StaffingCandidateArgsObjectSchema as StaffingCandidateArgsObjectSchema } from './StaffingCandidateArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagementId: z.boolean().optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  roleId: z.boolean().optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  candidateId: z.boolean().optional(),
  candidate: z.union([z.boolean(), z.lazy(() => StaffingCandidateArgsObjectSchema)]).optional(),
  personaId: z.boolean().optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  status: z.boolean().optional(),
  billRate: z.boolean().optional(),
  payRate: z.boolean().optional(),
  margin: z.boolean().optional(),
  note: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const StaffingPlacementSelectObjectSchema: z.ZodType<Prisma.StaffingPlacementSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementSelect>;
export const StaffingPlacementSelectObjectZodSchema = makeSchema();
