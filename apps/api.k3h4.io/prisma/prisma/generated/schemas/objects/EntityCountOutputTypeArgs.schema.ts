import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCountOutputTypeSelectObjectSchema as EntityCountOutputTypeSelectObjectSchema } from './EntityCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EntityCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const EntityCountOutputTypeArgsObjectSchema = makeSchema();
export const EntityCountOutputTypeArgsObjectZodSchema = makeSchema();
