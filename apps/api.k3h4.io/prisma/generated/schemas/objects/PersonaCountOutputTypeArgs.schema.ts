import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCountOutputTypeSelectObjectSchema as PersonaCountOutputTypeSelectObjectSchema } from './PersonaCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PersonaCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PersonaCountOutputTypeArgsObjectSchema = makeSchema();
export const PersonaCountOutputTypeArgsObjectZodSchema = makeSchema();
