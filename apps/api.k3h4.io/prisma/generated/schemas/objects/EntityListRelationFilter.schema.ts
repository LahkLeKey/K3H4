import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => EntityWhereInputObjectSchema).optional(),
  some: z.lazy(() => EntityWhereInputObjectSchema).optional(),
  none: z.lazy(() => EntityWhereInputObjectSchema).optional()
}).strict();
export const EntityListRelationFilterObjectSchema: z.ZodType<Prisma.EntityListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EntityListRelationFilter>;
export const EntityListRelationFilterObjectZodSchema = makeSchema();
