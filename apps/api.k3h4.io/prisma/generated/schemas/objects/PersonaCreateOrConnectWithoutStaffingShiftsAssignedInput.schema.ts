import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingShiftsAssignedInput>;
export const PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectZodSchema = makeSchema();
