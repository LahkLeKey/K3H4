import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheCreateManyInputObjectSchema as GeoRouteCacheCreateManyInputObjectSchema } from './objects/GeoRouteCacheCreateManyInput.schema';

export const GeoRouteCacheCreateManySchema: z.ZodType<Prisma.GeoRouteCacheCreateManyArgs> = z.object({ data: z.union([ GeoRouteCacheCreateManyInputObjectSchema, z.array(GeoRouteCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateManyArgs>;

export const GeoRouteCacheCreateManyZodSchema = z.object({ data: z.union([ GeoRouteCacheCreateManyInputObjectSchema, z.array(GeoRouteCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();