import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingCandidatesInputObjectSchema as PersonaCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema as PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingCandidatesInput.schema';
import { PersonaUpsertWithoutStaffingCandidatesInputObjectSchema as PersonaUpsertWithoutStaffingCandidatesInputObjectSchema } from './PersonaUpsertWithoutStaffingCandidatesInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema as PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInput.schema';
import { PersonaUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUpdateWithoutStaffingCandidatesInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingCandidatesInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutStaffingCandidatesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneWithoutStaffingCandidatesNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingCandidatesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingCandidatesNestedInput>;
export const PersonaUpdateOneWithoutStaffingCandidatesNestedInputObjectZodSchema = makeSchema();
