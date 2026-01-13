import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutUserInputObjectSchema as PersonaCompatibilityUpdateWithoutUserInputObjectSchema } from './PersonaCompatibilityUpdateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutUserInput.schema';
import { PersonaCompatibilityCreateWithoutUserInputObjectSchema as PersonaCompatibilityCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInput>;
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
