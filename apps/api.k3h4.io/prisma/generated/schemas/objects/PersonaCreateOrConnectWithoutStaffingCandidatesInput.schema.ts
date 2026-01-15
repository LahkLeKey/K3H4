import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutStaffingCandidatesInputObjectSchema as PersonaCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutStaffingCandidatesInput>;
export const PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
