import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './objects/PointOfInterestSelect.schema';
import { PointOfInterestUpdateManyMutationInputObjectSchema as PointOfInterestUpdateManyMutationInputObjectSchema } from './objects/PointOfInterestUpdateManyMutationInput.schema';
import { PointOfInterestWhereInputObjectSchema as PointOfInterestWhereInputObjectSchema } from './objects/PointOfInterestWhereInput.schema';

export const PointOfInterestUpdateManyAndReturnSchema: z.ZodType<Prisma.PointOfInterestUpdateManyAndReturnArgs> = z.object({ select: PointOfInterestSelectObjectSchema.optional(), data: PointOfInterestUpdateManyMutationInputObjectSchema, where: PointOfInterestWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestUpdateManyAndReturnArgs>;

export const PointOfInterestUpdateManyAndReturnZodSchema = z.object({ select: PointOfInterestSelectObjectSchema.optional(), data: PointOfInterestUpdateManyMutationInputObjectSchema, where: PointOfInterestWhereInputObjectSchema.optional() }).strict();