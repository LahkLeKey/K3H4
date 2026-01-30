import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentCreateManyInputObjectSchema as GeoDirectionSegmentCreateManyInputObjectSchema } from './objects/GeoDirectionSegmentCreateManyInput.schema';

export const GeoDirectionSegmentCreateManySchema: z.ZodType<Prisma.GeoDirectionSegmentCreateManyArgs> = z.object({ data: z.union([ GeoDirectionSegmentCreateManyInputObjectSchema, z.array(GeoDirectionSegmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateManyArgs>;

export const GeoDirectionSegmentCreateManyZodSchema = z.object({ data: z.union([ GeoDirectionSegmentCreateManyInputObjectSchema, z.array(GeoDirectionSegmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();