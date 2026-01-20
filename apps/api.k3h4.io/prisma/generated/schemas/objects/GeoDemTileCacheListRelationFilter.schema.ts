import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './GeoDemTileCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoDemTileCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoDemTileCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoDemTileCacheWhereInputObjectSchema).optional()
}).strict();
export const GeoDemTileCacheListRelationFilterObjectSchema: z.ZodType<Prisma.GeoDemTileCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheListRelationFilter>;
export const GeoDemTileCacheListRelationFilterObjectZodSchema = makeSchema();
