import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';

export const PointOfInterestDeleteOneSchema: z.ZodType<Prisma.PointOfInterestDeleteArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PointOfInterestDeleteArgs>;

export const PointOfInterestDeleteOneZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict();