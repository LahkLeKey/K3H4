import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './PersonaAttributeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PersonaAttributeSelectObjectSchema).optional(),
  include: z.lazy(() => PersonaAttributeIncludeObjectSchema).optional()
}).strict();
export const PersonaAttributeArgsObjectSchema = makeSchema();
export const PersonaAttributeArgsObjectZodSchema = makeSchema();
