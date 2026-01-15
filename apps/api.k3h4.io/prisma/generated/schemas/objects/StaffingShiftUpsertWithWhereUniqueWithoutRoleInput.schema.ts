import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutRoleInputObjectSchema as StaffingShiftUpdateWithoutRoleInputObjectSchema } from './StaffingShiftUpdateWithoutRoleInput.schema';
import { StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema as StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutRoleInput.schema';
import { StaffingShiftCreateWithoutRoleInputObjectSchema as StaffingShiftCreateWithoutRoleInputObjectSchema } from './StaffingShiftCreateWithoutRoleInput.schema';
import { StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema as StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutRoleInput>;
export const StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
