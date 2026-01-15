import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCreateWithoutRoleInputObjectSchema as StaffingShiftCreateWithoutRoleInputObjectSchema } from './StaffingShiftCreateWithoutRoleInput.schema';
import { StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema as StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutRoleInput>;
export const StaffingShiftCreateOrConnectWithoutRoleInputObjectZodSchema = makeSchema();
