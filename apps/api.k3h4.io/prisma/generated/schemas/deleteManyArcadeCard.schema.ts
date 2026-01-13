import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './objects/ArcadeCardWhereInput.schema';

export const ArcadeCardDeleteManySchema: z.ZodType<Prisma.ArcadeCardDeleteManyArgs> = z.object({ where: ArcadeCardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardDeleteManyArgs>;

export const ArcadeCardDeleteManyZodSchema = z.object({ where: ArcadeCardWhereInputObjectSchema.optional() }).strict();