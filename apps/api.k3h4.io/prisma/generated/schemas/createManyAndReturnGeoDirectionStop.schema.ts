import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopCreateManyInputObjectSchema as GeoDirectionStopCreateManyInputObjectSchema } from './objects/GeoDirectionStopCreateManyInput.schema';

export const GeoDirectionStopCreateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionStopCreateManyAndReturnArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), data: z.union([ GeoDirectionStopCreateManyInputObjectSchema, z.array(GeoDirectionStopCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopCreateManyAndReturnArgs>;

export const GeoDirectionStopCreateManyAndReturnZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), data: z.union([ GeoDirectionStopCreateManyInputObjectSchema, z.array(GeoDirectionStopCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();