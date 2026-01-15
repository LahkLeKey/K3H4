import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUpdateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingCandidatesInput.schema';
import { PersonaCreateWithoutStaffingCandidatesInputObjectSchema as PersonaCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutStaffingCandidatesInput>;
export const PersonaUpsertWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
