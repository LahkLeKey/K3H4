import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheCreateManyInputObjectSchema as GeoRouteCacheCreateManyInputObjectSchema } from './objects/GeoRouteCacheCreateManyInput.schema';

export const GeoRouteCacheCreateManyAndReturnSchema: z.ZodType<Prisma.GeoRouteCacheCreateManyAndReturnArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), data: z.union([ GeoRouteCacheCreateManyInputObjectSchema, z.array(GeoRouteCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateManyAndReturnArgs>;

export const GeoRouteCacheCreateManyAndReturnZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), data: z.union([ GeoRouteCacheCreateManyInputObjectSchema, z.array(GeoRouteCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();