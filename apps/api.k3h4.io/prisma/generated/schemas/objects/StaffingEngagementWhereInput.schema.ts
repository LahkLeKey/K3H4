import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumEngagementPriorityFilterObjectSchema as EnumEngagementPriorityFilterObjectSchema } from './EnumEngagementPriorityFilter.schema';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { StaffingRoleListRelationFilterObjectSchema as StaffingRoleListRelationFilterObjectSchema } from './StaffingRoleListRelationFilter.schema';
import { StaffingCandidateListRelationFilterObjectSchema as StaffingCandidateListRelationFilterObjectSchema } from './StaffingCandidateListRelationFilter.schema';
import { StaffingPlacementListRelationFilterObjectSchema as StaffingPlacementListRelationFilterObjectSchema } from './StaffingPlacementListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffingengagementwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingEngagementWhereInputObjectSchema), z.lazy(() => StaffingEngagementWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingEngagementWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingEngagementWhereInputObjectSchema), z.lazy(() => StaffingEngagementWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  client: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  priority: z.union([z.lazy(() => EnumEngagementPriorityFilterObjectSchema), EngagementPrioritySchema]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  startDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  endDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  budget: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'budget' must be a Decimal",
})]).optional().nullable(),
  forecast: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'forecast' must be a Decimal",
})]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  roles: z.lazy(() => StaffingRoleListRelationFilterObjectSchema).optional(),
  candidates: z.lazy(() => StaffingCandidateListRelationFilterObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementListRelationFilterObjectSchema).optional()
}).strict();
export const StaffingEngagementWhereInputObjectSchema: z.ZodType<Prisma.StaffingEngagementWhereInput> = staffingengagementwhereinputSchema as unknown as z.ZodType<Prisma.StaffingEngagementWhereInput>;
export const StaffingEngagementWhereInputObjectZodSchema = staffingengagementwhereinputSchema;
