import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeUpdateInputObjectSchema as ArcadePrizeUpdateInputObjectSchema } from './objects/ArcadePrizeUpdateInput.schema';
import { ArcadePrizeUncheckedUpdateInputObjectSchema as ArcadePrizeUncheckedUpdateInputObjectSchema } from './objects/ArcadePrizeUncheckedUpdateInput.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';

export const ArcadePrizeUpdateOneSchema: z.ZodType<Prisma.ArcadePrizeUpdateArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), data: z.union([ArcadePrizeUpdateInputObjectSchema, ArcadePrizeUncheckedUpdateInputObjectSchema]), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateArgs>;

export const ArcadePrizeUpdateOneZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), data: z.union([ArcadePrizeUpdateInputObjectSchema, ArcadePrizeUncheckedUpdateInputObjectSchema]), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict();