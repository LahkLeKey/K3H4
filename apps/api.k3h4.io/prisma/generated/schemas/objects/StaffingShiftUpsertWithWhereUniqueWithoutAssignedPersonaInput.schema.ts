import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUpdateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutAssignedPersonaInput.schema';
import { StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutAssignedPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema)])
}).strict();
export const StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInput>;
export const StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
