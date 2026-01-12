import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUpdateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentPayoutsInput.schema';
import { PersonaCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutAssignmentPayoutsInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutAssignmentPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutAssignmentPayoutsInput>;
export const PersonaUpsertWithoutAssignmentPayoutsInputObjectZodSchema = makeSchema();
