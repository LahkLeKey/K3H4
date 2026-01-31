import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ActorWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ActorWhereInputObjectSchema).optional().nullable()
}).strict();
export const ActorNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ActorNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ActorNullableScalarRelationFilter>;
export const ActorNullableScalarRelationFilterObjectZodSchema = makeSchema();
