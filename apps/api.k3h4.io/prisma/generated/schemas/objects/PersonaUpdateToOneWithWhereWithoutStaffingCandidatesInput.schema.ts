import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUpdateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInput>;
export const PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
