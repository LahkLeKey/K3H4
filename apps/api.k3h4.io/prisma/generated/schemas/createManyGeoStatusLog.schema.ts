import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogCreateManyInputObjectSchema as GeoStatusLogCreateManyInputObjectSchema } from './objects/GeoStatusLogCreateManyInput.schema';

export const GeoStatusLogCreateManySchema: z.ZodType<Prisma.GeoStatusLogCreateManyArgs> = z.object({ data: z.union([ GeoStatusLogCreateManyInputObjectSchema, z.array(GeoStatusLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogCreateManyArgs>;

export const GeoStatusLogCreateManyZodSchema = z.object({ data: z.union([ GeoStatusLogCreateManyInputObjectSchema, z.array(GeoStatusLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();