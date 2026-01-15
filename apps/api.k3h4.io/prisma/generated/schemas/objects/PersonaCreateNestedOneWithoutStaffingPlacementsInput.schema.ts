import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingPlacementsInputObjectSchema as PersonaCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema as PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingPlacementsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingPlacementsInput>;
export const PersonaCreateNestedOneWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
