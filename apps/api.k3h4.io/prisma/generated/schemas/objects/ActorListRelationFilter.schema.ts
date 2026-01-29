import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  some: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  none: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorListRelationFilterObjectSchema: z.ZodType<Prisma.ActorListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ActorListRelationFilter>;
export const ActorListRelationFilterObjectZodSchema = makeSchema();
