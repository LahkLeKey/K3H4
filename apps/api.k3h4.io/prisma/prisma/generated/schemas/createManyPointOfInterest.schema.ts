import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestCreateManyInputObjectSchema as PointOfInterestCreateManyInputObjectSchema } from './objects/PointOfInterestCreateManyInput.schema';

export const PointOfInterestCreateManySchema: z.ZodType<Prisma.PointOfInterestCreateManyArgs> = z.object({ data: z.union([ PointOfInterestCreateManyInputObjectSchema, z.array(PointOfInterestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestCreateManyArgs>;

export const PointOfInterestCreateManyZodSchema = z.object({ data: z.union([ PointOfInterestCreateManyInputObjectSchema, z.array(PointOfInterestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();