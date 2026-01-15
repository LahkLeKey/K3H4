import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutUserInputObjectSchema as StaffingShiftUpdateWithoutUserInputObjectSchema } from './StaffingShiftUpdateWithoutUserInput.schema';
import { StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema as StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutUserInput.schema';
import { StaffingShiftCreateWithoutUserInputObjectSchema as StaffingShiftCreateWithoutUserInputObjectSchema } from './StaffingShiftCreateWithoutUserInput.schema';
import { StaffingShiftUncheckedCreateWithoutUserInputObjectSchema as StaffingShiftUncheckedCreateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutUserInput>;
export const StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
