import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistoryCreateManyInputObjectSchema as GeoViewHistoryCreateManyInputObjectSchema } from './objects/GeoViewHistoryCreateManyInput.schema';

export const GeoViewHistoryCreateManySchema: z.ZodType<Prisma.GeoViewHistoryCreateManyArgs> = z.object({ data: z.union([ GeoViewHistoryCreateManyInputObjectSchema, z.array(GeoViewHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateManyArgs>;

export const GeoViewHistoryCreateManyZodSchema = z.object({ data: z.union([ GeoViewHistoryCreateManyInputObjectSchema, z.array(GeoViewHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();