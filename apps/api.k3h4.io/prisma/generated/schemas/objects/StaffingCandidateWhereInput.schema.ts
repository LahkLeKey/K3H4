import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { StaffingEngagementNullableScalarRelationFilterObjectSchema as StaffingEngagementNullableScalarRelationFilterObjectSchema } from './StaffingEngagementNullableScalarRelationFilter.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingRoleNullableScalarRelationFilterObjectSchema as StaffingRoleNullableScalarRelationFilterObjectSchema } from './StaffingRoleNullableScalarRelationFilter.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { PersonaNullableScalarRelationFilterObjectSchema as PersonaNullableScalarRelationFilterObjectSchema } from './PersonaNullableScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { StaffingPlacementListRelationFilterObjectSchema as StaffingPlacementListRelationFilterObjectSchema } from './StaffingPlacementListRelationFilter.schema';
import { StaffingShiftListRelationFilterObjectSchema as StaffingShiftListRelationFilterObjectSchema } from './StaffingShiftListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffingcandidatewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingCandidateWhereInputObjectSchema), z.lazy(() => StaffingCandidateWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingCandidateWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingCandidateWhereInputObjectSchema), z.lazy(() => StaffingCandidateWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  engagementId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  roleId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  personaId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  fullName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  stage: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  score: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'score' must be a Decimal",
})]).optional().nullable(),
  desiredRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'desiredRate' must be a Decimal",
})]).optional().nullable(),
  availability: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  engagement: z.union([z.lazy(() => StaffingEngagementNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  role: z.union([z.lazy(() => StaffingRoleNullableScalarRelationFilterObjectSchema), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  persona: z.union([z.lazy(() => PersonaNullableScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  placements: z.lazy(() => StaffingPlacementListRelationFilterObjectSchema).optional(),
  shiftsAssigned: z.lazy(() => StaffingShiftListRelationFilterObjectSchema).optional()
}).strict();
export const StaffingCandidateWhereInputObjectSchema: z.ZodType<Prisma.StaffingCandidateWhereInput> = staffingcandidatewhereinputSchema as unknown as z.ZodType<Prisma.StaffingCandidateWhereInput>;
export const StaffingCandidateWhereInputObjectZodSchema = staffingcandidatewhereinputSchema;
