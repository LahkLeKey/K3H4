import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';

export const ArcadePrizeDeleteOneSchema: z.ZodType<Prisma.ArcadePrizeDeleteArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeDeleteArgs>;

export const ArcadePrizeDeleteOneZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict();