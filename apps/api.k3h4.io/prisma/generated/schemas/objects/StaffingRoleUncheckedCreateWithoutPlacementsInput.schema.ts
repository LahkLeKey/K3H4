import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { StaffingCandidateUncheckedCreateNestedManyWithoutRoleInputObjectSchema as StaffingCandidateUncheckedCreateNestedManyWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedCreateNestedManyWithoutRoleInput.schema';
import { StaffingShiftUncheckedCreateNestedManyWithoutRoleInputObjectSchema as StaffingShiftUncheckedCreateNestedManyWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedCreateNestedManyWithoutRoleInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  engagementId: z.string().optional().nullable(),
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
  candidates: z.lazy(() => StaffingCandidateUncheckedCreateNestedManyWithoutRoleInputObjectSchema).optional(),
  shifts: z.lazy(() => StaffingShiftUncheckedCreateNestedManyWithoutRoleInputObjectSchema).optional()
}).strict();
export const StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingRoleUncheckedCreateWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUncheckedCreateWithoutPlacementsInput>;
export const StaffingRoleUncheckedCreateWithoutPlacementsInputObjectZodSchema = makeSchema();
