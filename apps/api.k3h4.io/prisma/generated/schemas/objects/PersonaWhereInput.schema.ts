import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AssignmentListRelationFilterObjectSchema as AssignmentListRelationFilterObjectSchema } from './AssignmentListRelationFilter.schema';
import { AssignmentPayoutListRelationFilterObjectSchema as AssignmentPayoutListRelationFilterObjectSchema } from './AssignmentPayoutListRelationFilter.schema';
import { StaffingCandidateListRelationFilterObjectSchema as StaffingCandidateListRelationFilterObjectSchema } from './StaffingCandidateListRelationFilter.schema';
import { StaffingShiftListRelationFilterObjectSchema as StaffingShiftListRelationFilterObjectSchema } from './StaffingShiftListRelationFilter.schema';
import { StaffingPlacementListRelationFilterObjectSchema as StaffingPlacementListRelationFilterObjectSchema } from './StaffingPlacementListRelationFilter.schema';
import { PersonaAttributeListRelationFilterObjectSchema as PersonaAttributeListRelationFilterObjectSchema } from './PersonaAttributeListRelationFilter.schema';
import { PersonaCompatibilityListRelationFilterObjectSchema as PersonaCompatibilityListRelationFilterObjectSchema } from './PersonaCompatibilityListRelationFilter.schema'

const personawhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaWhereInputObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaWhereInputObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  alias: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  account: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  handle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  assignments: z.lazy(() => AssignmentListRelationFilterObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutListRelationFilterObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateListRelationFilterObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftListRelationFilterObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementListRelationFilterObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeListRelationFilterObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityListRelationFilterObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityListRelationFilterObjectSchema).optional()
}).strict();
export const PersonaWhereInputObjectSchema: z.ZodType<Prisma.PersonaWhereInput> = personawhereinputSchema as unknown as z.ZodType<Prisma.PersonaWhereInput>;
export const PersonaWhereInputObjectZodSchema = personawhereinputSchema;
