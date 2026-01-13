import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './PersonaInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PersonaSelectObjectSchema).optional(),
  include: z.lazy(() => PersonaIncludeObjectSchema).optional()
}).strict();
export const PersonaArgsObjectSchema = makeSchema();
export const PersonaArgsObjectZodSchema = makeSchema();
