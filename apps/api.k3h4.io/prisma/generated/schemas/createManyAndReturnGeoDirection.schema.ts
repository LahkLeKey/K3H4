import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionCreateManyInputObjectSchema as GeoDirectionCreateManyInputObjectSchema } from './objects/GeoDirectionCreateManyInput.schema';

export const GeoDirectionCreateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionCreateManyAndReturnArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), data: z.union([ GeoDirectionCreateManyInputObjectSchema, z.array(GeoDirectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionCreateManyAndReturnArgs>;

export const GeoDirectionCreateManyAndReturnZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), data: z.union([ GeoDirectionCreateManyInputObjectSchema, z.array(GeoDirectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();