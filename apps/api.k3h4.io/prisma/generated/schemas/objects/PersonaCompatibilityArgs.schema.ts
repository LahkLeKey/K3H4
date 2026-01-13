import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './PersonaCompatibilityInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PersonaCompatibilitySelectObjectSchema).optional(),
  include: z.lazy(() => PersonaCompatibilityIncludeObjectSchema).optional()
}).strict();
export const PersonaCompatibilityArgsObjectSchema = makeSchema();
export const PersonaCompatibilityArgsObjectZodSchema = makeSchema();
