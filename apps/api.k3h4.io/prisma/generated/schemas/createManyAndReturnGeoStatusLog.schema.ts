import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogCreateManyInputObjectSchema as GeoStatusLogCreateManyInputObjectSchema } from './objects/GeoStatusLogCreateManyInput.schema';

export const GeoStatusLogCreateManyAndReturnSchema: z.ZodType<Prisma.GeoStatusLogCreateManyAndReturnArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), data: z.union([ GeoStatusLogCreateManyInputObjectSchema, z.array(GeoStatusLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogCreateManyAndReturnArgs>;

export const GeoStatusLogCreateManyAndReturnZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), data: z.union([ GeoStatusLogCreateManyInputObjectSchema, z.array(GeoStatusLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();