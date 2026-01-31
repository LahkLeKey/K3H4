import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestUpdateInputObjectSchema as PointOfInterestUpdateInputObjectSchema } from './objects/PointOfInterestUpdateInput.schema';
import { PointOfInterestUncheckedUpdateInputObjectSchema as PointOfInterestUncheckedUpdateInputObjectSchema } from './objects/PointOfInterestUncheckedUpdateInput.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';

export const PointOfInterestUpdateOneSchema: z.ZodType<Prisma.PointOfInterestUpdateArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  data: z.union([PointOfInterestUpdateInputObjectSchema, PointOfInterestUncheckedUpdateInputObjectSchema]), where: PointOfInterestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PointOfInterestUpdateArgs>;

export const PointOfInterestUpdateOneZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  data: z.union([PointOfInterestUpdateInputObjectSchema, PointOfInterestUncheckedUpdateInputObjectSchema]), where: PointOfInterestWhereUniqueInputObjectSchema }).strict();