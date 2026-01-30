import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorScalarRelationFilterObjectSchema: z.ZodType<Prisma.ActorScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ActorScalarRelationFilter>;
export const ActorScalarRelationFilterObjectZodSchema = makeSchema();
