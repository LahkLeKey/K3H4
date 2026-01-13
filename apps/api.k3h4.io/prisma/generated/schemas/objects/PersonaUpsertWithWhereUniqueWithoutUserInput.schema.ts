import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateWithoutUserInputObjectSchema as PersonaUpdateWithoutUserInputObjectSchema } from './PersonaUpdateWithoutUserInput.schema';
import { PersonaUncheckedUpdateWithoutUserInputObjectSchema as PersonaUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaUncheckedUpdateWithoutUserInput.schema';
import { PersonaCreateWithoutUserInputObjectSchema as PersonaCreateWithoutUserInputObjectSchema } from './PersonaCreateWithoutUserInput.schema';
import { PersonaUncheckedCreateWithoutUserInputObjectSchema as PersonaUncheckedCreateWithoutUserInputObjectSchema } from './PersonaUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpsertWithWhereUniqueWithoutUserInput>;
export const PersonaUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
