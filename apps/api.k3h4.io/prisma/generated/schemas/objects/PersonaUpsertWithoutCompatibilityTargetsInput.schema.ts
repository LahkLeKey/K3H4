import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUpdateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilityTargetsInput.schema';
import { PersonaCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutCompatibilityTargetsInput>;
export const PersonaUpsertWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();
