import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';
import { PointOfInterestCreateInputObjectSchema as PointOfInterestCreateInputObjectSchema } from './objects/PointOfInterestCreateInput.schema';
import { PointOfInterestUncheckedCreateInputObjectSchema as PointOfInterestUncheckedCreateInputObjectSchema } from './objects/PointOfInterestUncheckedCreateInput.schema';
import { PointOfInterestUpdateInputObjectSchema as PointOfInterestUpdateInputObjectSchema } from './objects/PointOfInterestUpdateInput.schema';
import { PointOfInterestUncheckedUpdateInputObjectSchema as PointOfInterestUncheckedUpdateInputObjectSchema } from './objects/PointOfInterestUncheckedUpdateInput.schema';

export const PointOfInterestUpsertOneSchema: z.ZodType<Prisma.PointOfInterestUpsertArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema, create: z.union([ PointOfInterestCreateInputObjectSchema, PointOfInterestUncheckedCreateInputObjectSchema ]), update: z.union([ PointOfInterestUpdateInputObjectSchema, PointOfInterestUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PointOfInterestUpsertArgs>;

export const PointOfInterestUpsertOneZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(),  where: PointOfInterestWhereUniqueInputObjectSchema, create: z.union([ PointOfInterestCreateInputObjectSchema, PointOfInterestUncheckedCreateInputObjectSchema ]), update: z.union([ PointOfInterestUpdateInputObjectSchema, PointOfInterestUncheckedUpdateInputObjectSchema ]) }).strict();