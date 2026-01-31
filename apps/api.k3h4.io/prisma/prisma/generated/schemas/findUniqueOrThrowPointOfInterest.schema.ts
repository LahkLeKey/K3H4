import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';

export const PointOfInterestFindUniqueOrThrowSchema: z.ZodType<Prisma.PointOfInterestFindUniqueOrThrowArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PointOfInterestFindUniqueOrThrowArgs>;

export const PointOfInterestFindUniqueOrThrowZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema }).strict();