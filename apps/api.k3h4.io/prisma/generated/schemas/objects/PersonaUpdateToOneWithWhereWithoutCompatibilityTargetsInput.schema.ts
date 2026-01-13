import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUpdateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilityTargetsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInput>;
export const PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();
