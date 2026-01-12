import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutUserInputObjectSchema as PersonaCompatibilityUpdateWithoutUserInputObjectSchema } from './PersonaCompatibilityUpdateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInput>;
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
