import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';

export const ArcadePrizeFindUniqueOrThrowSchema: z.ZodType<Prisma.ArcadePrizeFindUniqueOrThrowArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeFindUniqueOrThrowArgs>;

export const ArcadePrizeFindUniqueOrThrowZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema }).strict();