import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheCreateManyInputObjectSchema as GeoDemTileCacheCreateManyInputObjectSchema } from './objects/GeoDemTileCacheCreateManyInput.schema';

export const GeoDemTileCacheCreateManySchema: z.ZodType<Prisma.GeoDemTileCacheCreateManyArgs> = z.object({ data: z.union([ GeoDemTileCacheCreateManyInputObjectSchema, z.array(GeoDemTileCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateManyArgs>;

export const GeoDemTileCacheCreateManyZodSchema = z.object({ data: z.union([ GeoDemTileCacheCreateManyInputObjectSchema, z.array(GeoDemTileCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();