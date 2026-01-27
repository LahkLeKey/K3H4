import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionCreateManyInputObjectSchema as GeoDirectionCreateManyInputObjectSchema } from './objects/GeoDirectionCreateManyInput.schema';

export const GeoDirectionCreateManySchema: z.ZodType<Prisma.GeoDirectionCreateManyArgs> = z.object({ data: z.union([ GeoDirectionCreateManyInputObjectSchema, z.array(GeoDirectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionCreateManyArgs>;

export const GeoDirectionCreateManyZodSchema = z.object({ data: z.union([ GeoDirectionCreateManyInputObjectSchema, z.array(GeoDirectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();