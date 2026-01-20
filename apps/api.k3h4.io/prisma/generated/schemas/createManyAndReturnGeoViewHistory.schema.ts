import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryCreateManyInputObjectSchema as GeoViewHistoryCreateManyInputObjectSchema } from './objects/GeoViewHistoryCreateManyInput.schema';

export const GeoViewHistoryCreateManyAndReturnSchema: z.ZodType<Prisma.GeoViewHistoryCreateManyAndReturnArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), data: z.union([ GeoViewHistoryCreateManyInputObjectSchema, z.array(GeoViewHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateManyAndReturnArgs>;

export const GeoViewHistoryCreateManyAndReturnZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), data: z.union([ GeoViewHistoryCreateManyInputObjectSchema, z.array(GeoViewHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();