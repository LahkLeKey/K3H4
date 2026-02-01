import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCountOutputTypeSelectObjectSchema as ActorCountOutputTypeSelectObjectSchema } from './ActorCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ActorCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ActorCountOutputTypeArgsObjectSchema = makeSchema();
export const ActorCountOutputTypeArgsObjectZodSchema = makeSchema();
