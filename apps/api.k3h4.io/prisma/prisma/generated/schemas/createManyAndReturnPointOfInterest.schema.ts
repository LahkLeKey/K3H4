import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestCreateManyInputObjectSchema as PointOfInterestCreateManyInputObjectSchema } from './objects/PointOfInterestCreateManyInput.schema';

export const PointOfInterestCreateManyAndReturnSchema: z.ZodType<Prisma.PointOfInterestCreateManyAndReturnArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(), data: z.union([ PointOfInterestCreateManyInputObjectSchema, z.array(PointOfInterestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestCreateManyAndReturnArgs>;

export const PointOfInterestCreateManyAndReturnZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(), data: z.union([ PointOfInterestCreateManyInputObjectSchema, z.array(PointOfInterestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();