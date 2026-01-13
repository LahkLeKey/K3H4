import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeCreateWithoutPersonaInputObjectSchema as PersonaAttributeCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateOrConnectWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateOrConnectWithoutPersonaInput>;
export const PersonaAttributeCreateOrConnectWithoutPersonaInputObjectZodSchema = makeSchema();
