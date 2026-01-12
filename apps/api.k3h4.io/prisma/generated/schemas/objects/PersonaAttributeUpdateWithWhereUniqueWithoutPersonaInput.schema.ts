import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithoutPersonaInputObjectSchema as PersonaAttributeUpdateWithoutPersonaInputObjectSchema } from './PersonaAttributeUpdateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedUpdateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaAttributeUpdateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema)])
}).strict();
export const PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInput>;
export const PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
