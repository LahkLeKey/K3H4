import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingEngagementArgsObjectSchema as StaffingEngagementArgsObjectSchema } from './StaffingEngagementArgs.schema';
import { StaffingRoleArgsObjectSchema as StaffingRoleArgsObjectSchema } from './StaffingRoleArgs.schema';
import { StaffingCandidateArgsObjectSchema as StaffingCandidateArgsObjectSchema } from './StaffingCandidateArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  candidate: z.union([z.boolean(), z.lazy(() => StaffingCandidateArgsObjectSchema)]).optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional()
}).strict();
export const StaffingPlacementIncludeObjectSchema: z.ZodType<Prisma.StaffingPlacementInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementInclude>;
export const StaffingPlacementIncludeObjectZodSchema = makeSchema();
