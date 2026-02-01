import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './ActorInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ActorSelectObjectSchema).optional(),
  include: z.lazy(() => ActorIncludeObjectSchema).optional()
}).strict();
export const ActorArgsObjectSchema = makeSchema();
export const ActorArgsObjectZodSchema = makeSchema();
