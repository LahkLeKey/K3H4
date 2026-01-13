import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeScalarWhereInputObjectSchema as PersonaAttributeScalarWhereInputObjectSchema } from './PersonaAttributeScalarWhereInput.schema';
import { PersonaAttributeUpdateManyMutationInputObjectSchema as PersonaAttributeUpdateManyMutationInputObjectSchema } from './PersonaAttributeUpdateManyMutationInput.schema';
import { PersonaAttributeUncheckedUpdateManyWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedUpdateManyWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedUpdateManyWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaAttributeUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateManyWithoutPersonaInputObjectSchema)])
}).strict();
export const PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateManyWithWhereWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateManyWithWhereWithoutPersonaInput>;
export const PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectZodSchema = makeSchema();
