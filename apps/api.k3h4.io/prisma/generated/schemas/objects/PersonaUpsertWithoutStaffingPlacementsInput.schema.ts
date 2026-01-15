import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUpdateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingPlacementsInput.schema';
import { PersonaCreateWithoutStaffingPlacementsInputObjectSchema as PersonaCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutStaffingPlacementsInput>;
export const PersonaUpsertWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
