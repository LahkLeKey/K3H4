import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithoutUserInputObjectSchema as PersonaAttributeUpdateWithoutUserInputObjectSchema } from './PersonaAttributeUpdateWithoutUserInput.schema';
import { PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema as PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaAttributeUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateWithWhereUniqueWithoutUserInput>;
export const PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
