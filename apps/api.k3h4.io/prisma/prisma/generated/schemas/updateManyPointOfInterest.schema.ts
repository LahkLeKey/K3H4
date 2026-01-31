import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestUpdateManyMutationInputObjectSchema as PointOfInterestUpdateManyMutationInputObjectSchema } from './objects/PointOfInterestUpdateManyMutationInput.schema';
import { PointOfInterestWhereInputObjectSchema as PointOfInterestWhereInputObjectSchema } from './objects/PointOfInterestWhereInput.schema';

export const PointOfInterestUpdateManySchema: z.ZodType<Prisma.PointOfInterestUpdateManyArgs> = z.object({ data: PointOfInterestUpdateManyMutationInputObjectSchema, where: PointOfInterestWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestUpdateManyArgs>;

export const PointOfInterestUpdateManyZodSchema = z.object({ data: PointOfInterestUpdateManyMutationInputObjectSchema, where: PointOfInterestWhereInputObjectSchema.optional() }).strict();