import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardUpdateInputObjectSchema as ArcadeCardUpdateInputObjectSchema } from './objects/ArcadeCardUpdateInput.schema';
import { ArcadeCardUncheckedUpdateInputObjectSchema as ArcadeCardUncheckedUpdateInputObjectSchema } from './objects/ArcadeCardUncheckedUpdateInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';

export const ArcadeCardUpdateOneSchema: z.ZodType<Prisma.ArcadeCardUpdateArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), data: z.union([ArcadeCardUpdateInputObjectSchema, ArcadeCardUncheckedUpdateInputObjectSchema]), where: ArcadeCardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeCardUpdateArgs>;

export const ArcadeCardUpdateOneZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), data: z.union([ArcadeCardUpdateInputObjectSchema, ArcadeCardUncheckedUpdateInputObjectSchema]), where: ArcadeCardWhereUniqueInputObjectSchema }).strict();