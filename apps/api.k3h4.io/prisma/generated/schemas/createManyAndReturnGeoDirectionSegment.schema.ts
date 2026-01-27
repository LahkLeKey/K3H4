import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentCreateManyInputObjectSchema as GeoDirectionSegmentCreateManyInputObjectSchema } from './objects/GeoDirectionSegmentCreateManyInput.schema';

export const GeoDirectionSegmentCreateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateManyAndReturnArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), data: z.union([ GeoDirectionSegmentCreateManyInputObjectSchema, z.array(GeoDirectionSegmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateManyAndReturnArgs>;

export const GeoDirectionSegmentCreateManyAndReturnZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), data: z.union([ GeoDirectionSegmentCreateManyInputObjectSchema, z.array(GeoDirectionSegmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();