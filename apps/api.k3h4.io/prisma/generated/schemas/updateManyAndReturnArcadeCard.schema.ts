import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardUpdateManyMutationInputObjectSchema as ArcadeCardUpdateManyMutationInputObjectSchema } from './objects/ArcadeCardUpdateManyMutationInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './objects/ArcadeCardWhereInput.schema';

export const ArcadeCardUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadeCardUpdateManyAndReturnArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), data: ArcadeCardUpdateManyMutationInputObjectSchema, where: ArcadeCardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardUpdateManyAndReturnArgs>;

export const ArcadeCardUpdateManyAndReturnZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), data: ArcadeCardUpdateManyMutationInputObjectSchema, where: ArcadeCardWhereInputObjectSchema.optional() }).strict();