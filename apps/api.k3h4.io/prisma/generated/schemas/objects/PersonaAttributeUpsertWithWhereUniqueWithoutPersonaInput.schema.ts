import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithoutPersonaInputObjectSchema as PersonaAttributeUpdateWithoutPersonaInputObjectSchema } from './PersonaAttributeUpdateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedUpdateWithoutPersonaInput.schema';
import { PersonaAttributeCreateWithoutPersonaInputObjectSchema as PersonaAttributeCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaAttributeUpdateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateWithoutPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInput>;
export const PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
