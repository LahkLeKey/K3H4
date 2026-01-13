import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';

export const ArcadePrizeFindUniqueSchema: z.ZodType<Prisma.ArcadePrizeFindUniqueArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeFindUniqueArgs>;

export const ArcadePrizeFindUniqueZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict();