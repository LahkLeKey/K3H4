import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  engagementId: z.string().optional().nullable(),
  roleId: z.string().optional().nullable(),
  personaId: z.string().optional().nullable(),
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
  updatedAt: z.coerce.date().optional()
}).strict();
export const StaffingCandidateCreateManyUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyUserInput>;
export const StaffingCandidateCreateManyUserInputObjectZodSchema = makeSchema();
