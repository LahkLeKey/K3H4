import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheCreateManyInputObjectSchema as GeoQueryCacheCreateManyInputObjectSchema } from './objects/GeoQueryCacheCreateManyInput.schema';

export const GeoQueryCacheCreateManySchema: z.ZodType<Prisma.GeoQueryCacheCreateManyArgs> = z.object({ data: z.union([ GeoQueryCacheCreateManyInputObjectSchema, z.array(GeoQueryCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateManyArgs>;

export const GeoQueryCacheCreateManyZodSchema = z.object({ data: z.union([ GeoQueryCacheCreateManyInputObjectSchema, z.array(GeoQueryCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();