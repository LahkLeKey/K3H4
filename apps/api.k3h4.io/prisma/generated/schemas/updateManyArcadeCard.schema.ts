import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardUpdateManyMutationInputObjectSchema as ArcadeCardUpdateManyMutationInputObjectSchema } from './objects/ArcadeCardUpdateManyMutationInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './objects/ArcadeCardWhereInput.schema';

export const ArcadeCardUpdateManySchema: z.ZodType<Prisma.ArcadeCardUpdateManyArgs> = z.object({ data: ArcadeCardUpdateManyMutationInputObjectSchema, where: ArcadeCardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardUpdateManyArgs>;

export const ArcadeCardUpdateManyZodSchema = z.object({ data: ArcadeCardUpdateManyMutationInputObjectSchema, where: ArcadeCardWhereInputObjectSchema.optional() }).strict();