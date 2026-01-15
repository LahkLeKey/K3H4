import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutShiftsInputObjectSchema as StaffingRoleCreateWithoutShiftsInputObjectSchema } from './StaffingRoleCreateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutShiftsInput.schema';
import { StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema as StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutShiftsInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingRoleCreateNestedOneWithoutShiftsInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutShiftsInput>;
export const StaffingRoleCreateNestedOneWithoutShiftsInputObjectZodSchema = makeSchema();
