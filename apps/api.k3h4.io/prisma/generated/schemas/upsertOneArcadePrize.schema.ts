import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeCreateInputObjectSchema as ArcadePrizeCreateInputObjectSchema } from './objects/ArcadePrizeCreateInput.schema';
import { ArcadePrizeUncheckedCreateInputObjectSchema as ArcadePrizeUncheckedCreateInputObjectSchema } from './objects/ArcadePrizeUncheckedCreateInput.schema';
import { ArcadePrizeUpdateInputObjectSchema as ArcadePrizeUpdateInputObjectSchema } from './objects/ArcadePrizeUpdateInput.schema';
import { ArcadePrizeUncheckedUpdateInputObjectSchema as ArcadePrizeUncheckedUpdateInputObjectSchema } from './objects/ArcadePrizeUncheckedUpdateInput.schema';

export const ArcadePrizeUpsertOneSchema: z.ZodType<Prisma.ArcadePrizeUpsertArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema, create: z.union([ ArcadePrizeCreateInputObjectSchema, ArcadePrizeUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadePrizeUpdateInputObjectSchema, ArcadePrizeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeUpsertArgs>;

export const ArcadePrizeUpsertOneZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), include: ArcadePrizeIncludeObjectSchema.optional(), where: ArcadePrizeWhereUniqueInputObjectSchema, create: z.union([ ArcadePrizeCreateInputObjectSchema, ArcadePrizeUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadePrizeUpdateInputObjectSchema, ArcadePrizeUncheckedUpdateInputObjectSchema ]) }).strict();