import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema as UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema } from './UserCreateNestedOneWithoutStaffingEngagementsInput.schema';
import { StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema as StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingRoleCreateNestedManyWithoutEngagementInput.schema';
import { StaffingCandidateCreateNestedManyWithoutEngagementInputObjectSchema as StaffingCandidateCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateNestedManyWithoutEngagementInput.schema';
import { StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema as StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutEngagementInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema),
  roles: z.lazy(() => StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema).optional(),
  candidates: z.lazy(() => StaffingCandidateCreateNestedManyWithoutEngagementInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCreateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateInput>;
export const StaffingEngagementCreateInputObjectZodSchema = makeSchema();
