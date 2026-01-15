import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutStaffingRolesInputObjectSchema as UserCreateNestedOneWithoutStaffingRolesInputObjectSchema } from './UserCreateNestedOneWithoutStaffingRolesInput.schema';
import { StaffingCandidateCreateNestedManyWithoutRoleInputObjectSchema as StaffingCandidateCreateNestedManyWithoutRoleInputObjectSchema } from './StaffingCandidateCreateNestedManyWithoutRoleInput.schema';
import { StaffingShiftCreateNestedManyWithoutRoleInputObjectSchema as StaffingShiftCreateNestedManyWithoutRoleInputObjectSchema } from './StaffingShiftCreateNestedManyWithoutRoleInput.schema';
import { StaffingPlacementCreateNestedManyWithoutRoleInputObjectSchema as StaffingPlacementCreateNestedManyWithoutRoleInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutRoleInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  location: z.string().optional().nullable(),
  modality: z.string().optional().nullable(),
  openings: z.number().int().optional(),
  filled: z.number().int().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  rateMin: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMin' must be a Decimal",
}).optional().nullable(),
  rateMax: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMax' must be a Decimal",
}).optional().nullable(),
  billRate: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'billRate' must be a Decimal",
}).optional().nullable(),
  payRate: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'payRate' must be a Decimal",
}).optional().nullable(),
  tags: z.string().optional().nullable(),
  skills: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingRolesInputObjectSchema),
  candidates: z.lazy(() => StaffingCandidateCreateNestedManyWithoutRoleInputObjectSchema).optional(),
  shifts: z.lazy(() => StaffingShiftCreateNestedManyWithoutRoleInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutRoleInputObjectSchema).optional()
}).strict();
export const StaffingRoleCreateWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateWithoutEngagementInput>;
export const StaffingRoleCreateWithoutEngagementInputObjectZodSchema = makeSchema();
