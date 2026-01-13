import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaUpdateWithoutAttributesInputObjectSchema as PersonaUpdateWithoutAttributesInputObjectSchema } from './PersonaUpdateWithoutAttributesInput.schema';
import { PersonaUncheckedUpdateWithoutAttributesInputObjectSchema as PersonaUncheckedUpdateWithoutAttributesInputObjectSchema } from './PersonaUncheckedUpdateWithoutAttributesInput.schema';
import { PersonaCreateWithoutAttributesInputObjectSchema as PersonaCreateWithoutAttributesInputObjectSchema } from './PersonaCreateWithoutAttributesInput.schema';
import { PersonaUncheckedCreateWithoutAttributesInputObjectSchema as PersonaUncheckedCreateWithoutAttributesInputObjectSchema } from './PersonaUncheckedCreateWithoutAttributesInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PersonaUpdateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAttributesInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAttributesInputObjectSchema)]),
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaUpsertWithoutAttributesInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithoutAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithoutAttributesInput>;
export const PersonaUpsertWithoutAttributesInputObjectZodSchema = makeSchema();
