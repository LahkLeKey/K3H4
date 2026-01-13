import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutSourceInputObjectSchema as PersonaCompatibilityUpdateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUpdateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutSourceInput.schema';
import { PersonaCompatibilityCreateWithoutSourceInputObjectSchema as PersonaCompatibilityCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutSourceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInput>;
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectZodSchema = makeSchema();
