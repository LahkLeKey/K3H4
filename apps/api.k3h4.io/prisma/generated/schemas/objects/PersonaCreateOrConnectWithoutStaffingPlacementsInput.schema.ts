import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutStaffingPlacementsInputObjectSchema as PersonaCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingPlacementsInput>;
export const PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
