import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestCreateInputObjectSchema as PointOfInterestCreateInputObjectSchema } from './objects/PointOfInterestCreateInput.schema';
import { PointOfInterestUncheckedCreateInputObjectSchema as PointOfInterestUncheckedCreateInputObjectSchema } from './objects/PointOfInterestUncheckedCreateInput.schema';

export const PointOfInterestCreateOneSchema: z.ZodType<Prisma.PointOfInterestCreateArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  data: z.union([PointOfInterestCreateInputObjectSchema, PointOfInterestUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PointOfInterestCreateArgs>;

export const PointOfInterestCreateOneZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  data: z.union([PointOfInterestCreateInputObjectSchema, PointOfInterestUncheckedCreateInputObjectSchema]) }).strict();