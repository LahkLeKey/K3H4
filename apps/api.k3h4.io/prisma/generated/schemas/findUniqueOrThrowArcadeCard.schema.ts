import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';

export const ArcadeCardFindUniqueOrThrowSchema: z.ZodType<Prisma.ArcadeCardFindUniqueOrThrowArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeCardFindUniqueOrThrowArgs>;

export const ArcadeCardFindUniqueOrThrowZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema }).strict();