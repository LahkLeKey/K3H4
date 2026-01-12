import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeScalarWhereInputObjectSchema as PersonaAttributeScalarWhereInputObjectSchema } from './PersonaAttributeScalarWhereInput.schema';
import { PersonaAttributeUpdateManyMutationInputObjectSchema as PersonaAttributeUpdateManyMutationInputObjectSchema } from './PersonaAttributeUpdateManyMutationInput.schema';
import { PersonaAttributeUncheckedUpdateManyWithoutUserInputObjectSchema as PersonaAttributeUncheckedUpdateManyWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaAttributeUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateManyWithWhereWithoutUserInput>;
export const PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
