import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema'

const makeSchema = () => z.object({
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional()
}).strict();
export const EntityIncludeObjectSchema: z.ZodType<Prisma.EntityInclude> = makeSchema() as unknown as z.ZodType<Prisma.EntityInclude>;
export const EntityIncludeObjectZodSchema = makeSchema();
