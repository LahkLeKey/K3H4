import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema as UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema } from './UserCreateNestedOneWithoutStaffingEngagementsInput.schema';
import { StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema as StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingRoleCreateNestedManyWithoutEngagementInput.schema';
import { StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema as StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutEngagementInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  client: z.string().optional().nullable(),
  priority: EngagementPrioritySchema.optional(),
  status: LifecycleStatusSchema.optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema),
  roles: z.lazy(() => StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCreateWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateWithoutCandidatesInput>;
export const StaffingEngagementCreateWithoutCandidatesInputObjectZodSchema = makeSchema();
