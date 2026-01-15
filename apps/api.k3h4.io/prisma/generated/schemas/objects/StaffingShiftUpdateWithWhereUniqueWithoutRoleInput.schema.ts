import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutRoleInputObjectSchema as StaffingShiftUpdateWithoutRoleInputObjectSchema } from './StaffingShiftUpdateWithoutRoleInput.schema';
import { StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema as StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutRoleInput>;
export const StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
