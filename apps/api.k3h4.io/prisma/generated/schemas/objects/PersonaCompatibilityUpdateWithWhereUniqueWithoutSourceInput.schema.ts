import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutSourceInputObjectSchema as PersonaCompatibilityUpdateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUpdateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutSourceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutSourceInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInput>;
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectZodSchema = makeSchema();
