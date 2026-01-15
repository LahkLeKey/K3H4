import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutStaffingCandidatesInputObjectSchema as UserCreateNestedOneWithoutStaffingCandidatesInputObjectSchema } from './UserCreateNestedOneWithoutStaffingCandidatesInput.schema';
import { StaffingEngagementCreateNestedOneWithoutCandidatesInputObjectSchema as StaffingEngagementCreateNestedOneWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateNestedOneWithoutCandidatesInput.schema';
import { PersonaCreateNestedOneWithoutStaffingCandidatesInputObjectSchema as PersonaCreateNestedOneWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateNestedOneWithoutStaffingCandidatesInput.schema';
import { StaffingPlacementCreateNestedManyWithoutCandidateInputObjectSchema as StaffingPlacementCreateNestedManyWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutCandidateInput.schema';
import { StaffingShiftCreateNestedManyWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateNestedManyWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateNestedManyWithoutAssignedCandidateInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  stage: z.string().optional(),
  score: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'score' must be a Decimal",
}).optional().nullable(),
  desiredRate: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'desiredRate' must be a Decimal",
}).optional().nullable(),
  availability: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingCandidatesInputObjectSchema),
  engagement: z.lazy(() => StaffingEngagementCreateNestedOneWithoutCandidatesInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutStaffingCandidatesInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutCandidateInputObjectSchema).optional(),
  shiftsAssigned: z.lazy(() => StaffingShiftCreateNestedManyWithoutAssignedCandidateInputObjectSchema).optional()
}).strict();
export const StaffingCandidateCreateWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateWithoutRoleInput>;
export const StaffingCandidateCreateWithoutRoleInputObjectZodSchema = makeSchema();
