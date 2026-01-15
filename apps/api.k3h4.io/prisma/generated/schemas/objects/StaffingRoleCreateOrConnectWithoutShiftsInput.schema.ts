import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateWithoutShiftsInputObjectSchema as StaffingRoleCreateWithoutShiftsInputObjectSchema } from './StaffingRoleCreateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutShiftsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema)])
}).strict();
export const StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutShiftsInput>;
export const StaffingRoleCreateOrConnectWithoutShiftsInputObjectZodSchema = makeSchema();
