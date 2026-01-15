import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StaffingRoleUncheckedCreateNestedManyWithoutEngagementInputObjectSchema as StaffingRoleUncheckedCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedCreateNestedManyWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedCreateNestedManyWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedCreateNestedManyWithoutEngagementInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  client: z.string().optional().nullable(),
  priority: z.string().optional(),
  status: z.string().optional(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  budget: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'budget' must be a Decimal",
}).optional().nullable(),
  forecast: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'forecast' must be a Decimal",
}).optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => StaffingRoleUncheckedCreateNestedManyWithoutEngagementInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementUncheckedCreateNestedManyWithoutEngagementInputObjectSchema).optional()
}).strict();
export const StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUncheckedCreateWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUncheckedCreateWithoutCandidatesInput>;
export const StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectZodSchema = makeSchema();
