import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopCreateManyInputObjectSchema as GeoDirectionStopCreateManyInputObjectSchema } from './objects/GeoDirectionStopCreateManyInput.schema';

export const GeoDirectionStopCreateManySchema: z.ZodType<Prisma.GeoDirectionStopCreateManyArgs> = z.object({ data: z.union([ GeoDirectionStopCreateManyInputObjectSchema, z.array(GeoDirectionStopCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopCreateManyArgs>;

export const GeoDirectionStopCreateManyZodSchema = z.object({ data: z.union([ GeoDirectionStopCreateManyInputObjectSchema, z.array(GeoDirectionStopCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();