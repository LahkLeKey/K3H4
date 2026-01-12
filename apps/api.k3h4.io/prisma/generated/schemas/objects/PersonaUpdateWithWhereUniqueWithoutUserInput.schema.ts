import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateWithoutUserInputObjectSchema as PersonaUpdateWithoutUserInputObjectSchema } from './PersonaUpdateWithoutUserInput.schema';
import { PersonaUncheckedUpdateWithoutUserInputObjectSchema as PersonaUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateWithWhereUniqueWithoutUserInput>;
export const PersonaUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
