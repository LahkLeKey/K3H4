import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardCreateInputObjectSchema as ArcadeCardCreateInputObjectSchema } from './objects/ArcadeCardCreateInput.schema';
import { ArcadeCardUncheckedCreateInputObjectSchema as ArcadeCardUncheckedCreateInputObjectSchema } from './objects/ArcadeCardUncheckedCreateInput.schema';

export const ArcadeCardCreateOneSchema: z.ZodType<Prisma.ArcadeCardCreateArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), data: z.union([ArcadeCardCreateInputObjectSchema, ArcadeCardUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadeCardCreateArgs>;

export const ArcadeCardCreateOneZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), include: ArcadeCardIncludeObjectSchema.optional(), data: z.union([ArcadeCardCreateInputObjectSchema, ArcadeCardUncheckedCreateInputObjectSchema]) }).strict();