import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { StaffingEngagementNullableScalarRelationFilterObjectSchema as StaffingEngagementNullableScalarRelationFilterObjectSchema } from './StaffingEngagementNullableScalarRelationFilter.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingRoleNullableScalarRelationFilterObjectSchema as StaffingRoleNullableScalarRelationFilterObjectSchema } from './StaffingRoleNullableScalarRelationFilter.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingCandidateNullableScalarRelationFilterObjectSchema as StaffingCandidateNullableScalarRelationFilterObjectSchema } from './StaffingCandidateNullableScalarRelationFilter.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema';
import { PersonaNullableScalarRelationFilterObjectSchema as PersonaNullableScalarRelationFilterObjectSchema } from './PersonaNullableScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffingplacementwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingPlacementWhereInputObjectSchema), z.lazy(() => StaffingPlacementWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingPlacementWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingPlacementWhereInputObjectSchema), z.lazy(() => StaffingPlacementWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  engagementId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  roleId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  candidateId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  personaId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  startDate: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  endDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  billRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'billRate' must be a Decimal",
})]).optional().nullable(),
  payRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'payRate' must be a Decimal",
})]).optional().nullable(),
  margin: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'margin' must be a Decimal",
})]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  engagement: z.union([z.lazy(() => StaffingEngagementNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  role: z.union([z.lazy(() => StaffingRoleNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  candidate: z.union([z.lazy(() => StaffingCandidateNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional(),
  persona: z.union([z.lazy(() => PersonaNullableScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional()
}).strict();
export const StaffingPlacementWhereInputObjectSchema: z.ZodType<Prisma.StaffingPlacementWhereInput> = staffingplacementwhereinputSchema as unknown as z.ZodType<Prisma.StaffingPlacementWhereInput>;
export const StaffingPlacementWhereInputObjectZodSchema = staffingplacementwhereinputSchema;
