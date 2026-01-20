import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheCreateManyInputObjectSchema as GeoQueryCacheCreateManyInputObjectSchema } from './objects/GeoQueryCacheCreateManyInput.schema';

export const GeoQueryCacheCreateManyAndReturnSchema: z.ZodType<Prisma.GeoQueryCacheCreateManyAndReturnArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), data: z.union([ GeoQueryCacheCreateManyInputObjectSchema, z.array(GeoQueryCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateManyAndReturnArgs>;

export const GeoQueryCacheCreateManyAndReturnZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), data: z.union([ GeoQueryCacheCreateManyInputObjectSchema, z.array(GeoQueryCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();