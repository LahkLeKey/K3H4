import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingCandidatesInputObjectSchema as PersonaCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema as PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingCandidatesInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutStaffingCandidatesInput>;
export const PersonaCreateNestedOneWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
