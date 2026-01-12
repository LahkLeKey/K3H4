import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutAssignmentsInputObjectSchema as PersonaUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUpdateWithoutAssignmentsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentsInput.schema';
import { PersonaCreateWithoutAssignmentsInputObjectSchema as PersonaCreateWithoutAssignmentsInputObjectSchema } from './PersonaCreateWithoutAssignmentsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentsInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutAssignmentsInput>;
export const PersonaUpsertWithoutAssignmentsInputObjectZodSchema = makeSchema();
