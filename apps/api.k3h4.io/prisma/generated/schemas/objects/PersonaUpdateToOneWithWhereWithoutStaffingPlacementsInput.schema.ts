import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUpdateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInput>;
export const PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
