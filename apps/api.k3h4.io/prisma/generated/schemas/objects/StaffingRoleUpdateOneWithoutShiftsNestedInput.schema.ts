import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutShiftsInputObjectSchema as StaffingRoleCreateWithoutShiftsInputObjectSchema } from './StaffingRoleCreateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutShiftsInput.schema';
import { StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema as StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutShiftsInput.schema';
import { StaffingRoleUpsertWithoutShiftsInputObjectSchema as StaffingRoleUpsertWithoutShiftsInputObjectSchema } from './StaffingRoleUpsertWithoutShiftsInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateToOneWithWhereWithoutShiftsInputObjectSchema as StaffingRoleUpdateToOneWithWhereWithoutShiftsInputObjectSchema } from './StaffingRoleUpdateToOneWithWhereWithoutShiftsInput.schema';
import { StaffingRoleUpdateWithoutShiftsInputObjectSchema as StaffingRoleUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUpdateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutShiftsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutShiftsInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingRoleUpsertWithoutShiftsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingRoleUpdateToOneWithWhereWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUpdateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema)]).optional()
}).strict();
export const StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateOneWithoutShiftsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateOneWithoutShiftsNestedInput>;
export const StaffingRoleUpdateOneWithoutShiftsNestedInputObjectZodSchema = makeSchema();
