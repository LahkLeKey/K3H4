import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithoutEngagementInputObjectSchema as StaffingRoleUpdateWithoutEngagementInputObjectSchema } from './StaffingRoleUpdateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingRoleUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateWithWhereUniqueWithoutEngagementInput>;
export const StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
