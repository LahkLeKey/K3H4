import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUpdateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutStaffingShiftsAssignedInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutStaffingShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutStaffingShiftsAssignedInput>;
export const PersonaUpsertWithoutStaffingShiftsAssignedInputObjectZodSchema = makeSchema();
