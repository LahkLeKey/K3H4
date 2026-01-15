import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithoutEngagementInputObjectSchema as StaffingRoleUpdateWithoutEngagementInputObjectSchema } from './StaffingRoleUpdateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutEngagementInput.schema';
import { StaffingRoleCreateWithoutEngagementInputObjectSchema as StaffingRoleCreateWithoutEngagementInputObjectSchema } from './StaffingRoleCreateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingRoleUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpsertWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpsertWithWhereUniqueWithoutEngagementInput>;
export const StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
