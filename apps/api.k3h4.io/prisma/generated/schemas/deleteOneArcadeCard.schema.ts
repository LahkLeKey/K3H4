import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';

export const ArcadeCardDeleteOneSchema: z.ZodType<Prisma.ArcadeCardDeleteArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeCardDeleteArgs>;

export const ArcadeCardDeleteOneZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema }).strict();