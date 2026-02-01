import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './ActorCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ActorCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => ActorCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => ActorCacheWhereInputObjectSchema).optional()
}).strict();
export const ActorCacheListRelationFilterObjectSchema: z.ZodType<Prisma.ActorCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheListRelationFilter>;
export const ActorCacheListRelationFilterObjectZodSchema = makeSchema();
