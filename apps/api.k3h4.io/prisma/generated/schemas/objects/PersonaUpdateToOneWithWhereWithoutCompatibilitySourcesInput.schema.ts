import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUpdateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilitySourcesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInput>;
export const PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInputObjectZodSchema = makeSchema();
