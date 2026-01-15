import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUpdateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInput>;
export const PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInputObjectZodSchema = makeSchema();
