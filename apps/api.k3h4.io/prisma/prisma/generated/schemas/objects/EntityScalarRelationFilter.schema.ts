import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => EntityWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => EntityWhereInputObjectSchema).optional()
}).strict();
export const EntityScalarRelationFilterObjectSchema: z.ZodType<Prisma.EntityScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EntityScalarRelationFilter>;
export const EntityScalarRelationFilterObjectZodSchema = makeSchema();
