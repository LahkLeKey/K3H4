import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingShiftsAssignedInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutStaffingShiftsAssignedInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingShiftsAssignedInput>;
export const PersonaCreateNestedOneWithoutStaffingShiftsAssignedInputObjectZodSchema = makeSchema();
