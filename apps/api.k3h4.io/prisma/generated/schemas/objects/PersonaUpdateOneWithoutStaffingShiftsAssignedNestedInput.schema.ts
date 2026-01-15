import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUpsertWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUpsertWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUpsertWithoutStaffingShiftsAssignedInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUpdateWithoutStaffingShiftsAssignedInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingShiftsAssignedInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingShiftsAssignedInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutStaffingShiftsAssignedInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUpdateWithoutStaffingShiftsAssignedInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingShiftsAssignedInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInput>;
export const PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectZodSchema = makeSchema();
