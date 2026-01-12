import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutAttributesInputObjectSchema as PersonaUpdateWithoutAttributesInputObjectSchema } from './PersonaUpdateWithoutAttributesInput.schema';
import { PersonaUncheckedUpdateWithoutAttributesInputObjectSchema as PersonaUncheckedUpdateWithoutAttributesInputObjectSchema } from './PersonaUncheckedUpdateWithoutAttributesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAttributesInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutAttributesInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAttributesInput>;
export const PersonaUpdateToOneWithWhereWithoutAttributesInputObjectZodSchema = makeSchema();
