import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeCreateInputObjectSchema as ArcadePrizeCreateInputObjectSchema } from './objects/ArcadePrizeCreateInput.schema';
import { ArcadePrizeUncheckedCreateInputObjectSchema as ArcadePrizeUncheckedCreateInputObjectSchema } from './objects/ArcadePrizeUncheckedCreateInput.schema';

export const ArcadePrizeCreateOneSchema: z.ZodType<Prisma.ArcadePrizeCreateArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), data: z.union([ArcadePrizeCreateInputObjectSchema, ArcadePrizeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeCreateArgs>;

export const ArcadePrizeCreateOneZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), data: z.union([ArcadePrizeCreateInputObjectSchema, ArcadePrizeUncheckedCreateInputObjectSchema]) }).strict();