import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUpdateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilitySourcesInput.schema';
import { PersonaCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutCompatibilitySourcesInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutCompatibilitySourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutCompatibilitySourcesInput>;
export const PersonaUpsertWithoutCompatibilitySourcesInputObjectZodSchema = makeSchema();
