import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';

export const PointOfInterestFindUniqueSchema: z.ZodType<Prisma.PointOfInterestFindUniqueArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PointOfInterestFindUniqueArgs>;

export const PointOfInterestFindUniqueZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict();