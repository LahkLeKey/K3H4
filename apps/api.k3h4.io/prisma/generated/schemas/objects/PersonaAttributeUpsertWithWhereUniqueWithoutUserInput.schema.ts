import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithoutUserInputObjectSchema as PersonaAttributeUpdateWithoutUserInputObjectSchema } from './PersonaAttributeUpdateWithoutUserInput.schema';
import { PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema as PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedUpdateWithoutUserInput.schema';
import { PersonaAttributeCreateWithoutUserInputObjectSchema as PersonaAttributeCreateWithoutUserInputObjectSchema } from './PersonaAttributeCreateWithoutUserInput.schema';
import { PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema as PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaAttributeUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpsertWithWhereUniqueWithoutUserInput>;
export const PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
