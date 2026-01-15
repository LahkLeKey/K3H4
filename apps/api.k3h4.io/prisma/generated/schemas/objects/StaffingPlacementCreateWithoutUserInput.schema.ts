import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StaffingEngagementCreateNestedOneWithoutPlacementsInputObjectSchema as StaffingEngagementCreateNestedOneWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateNestedOneWithoutPlacementsInput.schema';
import { StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema as StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateNestedOneWithoutPlacementsInput.schema';
import { StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema as StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateNestedOneWithoutPlacementsInput.schema';
import { PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema as PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateNestedOneWithoutStaffingPlacementsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
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
  margin: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'margin' must be a Decimal",
}).optional().nullable(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  engagement: z.lazy(() => StaffingEngagementCreateNestedOneWithoutPlacementsInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema).optional(),
  candidate: z.lazy(() => StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema).optional()
}).strict();
export const StaffingPlacementCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateWithoutUserInput>;
export const StaffingPlacementCreateWithoutUserInputObjectZodSchema = makeSchema();
