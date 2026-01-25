import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumCoverageStatusFilterObjectSchema as EnumCoverageStatusFilterObjectSchema } from './EnumCoverageStatusFilter.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { StaffingRoleNullableScalarRelationFilterObjectSchema as StaffingRoleNullableScalarRelationFilterObjectSchema } from './StaffingRoleNullableScalarRelationFilter.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { PersonaNullableScalarRelationFilterObjectSchema as PersonaNullableScalarRelationFilterObjectSchema } from './PersonaNullableScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { StaffingCandidateNullableScalarRelationFilterObjectSchema as StaffingCandidateNullableScalarRelationFilterObjectSchema } from './StaffingCandidateNullableScalarRelationFilter.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const staffingshiftwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingShiftWhereInputObjectSchema), z.lazy(() => StaffingShiftWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingShiftWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingShiftWhereInputObjectSchema), z.lazy(() => StaffingShiftWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  roleId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  startsAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  endsAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  coverageStatus: z.union([z.lazy(() => EnumCoverageStatusFilterObjectSchema), CoverageStatusSchema]).optional(),
  assignedPersonaId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  assignedCandidateId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  role: z.union([z.lazy(() => StaffingRoleNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  assignedPersona: z.union([z.lazy(() => PersonaNullableScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  assignedCandidate: z.union([z.lazy(() => StaffingCandidateNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional()
}).strict();
export const StaffingShiftWhereInputObjectSchema: z.ZodType<Prisma.StaffingShiftWhereInput> = staffingshiftwhereinputSchema as unknown as z.ZodType<Prisma.StaffingShiftWhereInput>;
export const StaffingShiftWhereInputObjectZodSchema = staffingshiftwhereinputSchema;
