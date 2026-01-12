import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutTargetInputObjectSchema as PersonaCompatibilityUpdateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUpdateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutTargetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInput>;
export const PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectZodSchema = makeSchema();
