import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutUserInputObjectSchema as StaffingShiftUpdateWithoutUserInputObjectSchema } from './StaffingShiftUpdateWithoutUserInput.schema';
import { StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema as StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutUserInput>;
export const StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
