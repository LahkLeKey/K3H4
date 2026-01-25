import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutStaffingPlacementsInputObjectSchema as UserCreateNestedOneWithoutStaffingPlacementsInputObjectSchema } from './UserCreateNestedOneWithoutStaffingPlacementsInput.schema';
import { StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema as StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateNestedOneWithoutPlacementsInput.schema';
import { StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema as StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateNestedOneWithoutPlacementsInput.schema';
import { PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema as PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateNestedOneWithoutStaffingPlacementsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  status: LifecycleStatusSchema.optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingPlacementsInputObjectSchema),
  role: z.lazy(() => StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema).optional(),
  candidate: z.lazy(() => StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema).optional()
}).strict();
export const StaffingPlacementCreateWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateWithoutEngagementInput>;
export const StaffingPlacementCreateWithoutEngagementInputObjectZodSchema = makeSchema();
