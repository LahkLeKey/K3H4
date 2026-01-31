import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestWhereInputObjectSchema as PointOfInterestWhereInputObjectSchema } from './objects/PointOfInterestWhereInput.schema';

export const PointOfInterestDeleteManySchema: z.ZodType<Prisma.PointOfInterestDeleteManyArgs> = z.object({ where: PointOfInterestWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestDeleteManyArgs>;

export const PointOfInterestDeleteManyZodSchema = z.object({ where: PointOfInterestWhereInputObjectSchema.optional() }).strict();