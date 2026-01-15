import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUpdateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutAssignedPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInput>;
export const StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
