import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateWithoutEngagementInputObjectSchema as StaffingRoleCreateWithoutEngagementInputObjectSchema } from './StaffingRoleCreateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutEngagementInput>;
export const StaffingRoleCreateOrConnectWithoutEngagementInputObjectZodSchema = makeSchema();
