import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCreateInputObjectSchema as ArcadeCardCreateInputObjectSchema } from './objects/ArcadeCardCreateInput.schema';
import { ArcadeCardUncheckedCreateInputObjectSchema as ArcadeCardUncheckedCreateInputObjectSchema } from './objects/ArcadeCardUncheckedCreateInput.schema';
import { ArcadeCardUpdateInputObjectSchema as ArcadeCardUpdateInputObjectSchema } from './objects/ArcadeCardUpdateInput.schema';
import { ArcadeCardUncheckedUpdateInputObjectSchema as ArcadeCardUncheckedUpdateInputObjectSchema } from './objects/ArcadeCardUncheckedUpdateInput.schema';

export const ArcadeCardUpsertOneSchema: z.ZodType<Prisma.ArcadeCardUpsertArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema, create: z.union([ ArcadeCardCreateInputObjectSchema, ArcadeCardUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeCardUpdateInputObjectSchema, ArcadeCardUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadeCardUpsertArgs>;

export const ArcadeCardUpsertOneZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), where: ArcadeCardWhereUniqueInputObjectSchema, create: z.union([ ArcadeCardCreateInputObjectSchema, ArcadeCardUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeCardUpdateInputObjectSchema, ArcadeCardUncheckedUpdateInputObjectSchema ]) }).strict();