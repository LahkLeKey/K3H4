import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeUpdateManyMutationInputObjectSchema as ArcadePrizeUpdateManyMutationInputObjectSchema } from './objects/ArcadePrizeUpdateManyMutationInput.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './objects/ArcadePrizeWhereInput.schema';

export const ArcadePrizeUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadePrizeUpdateManyAndReturnArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), data: ArcadePrizeUpdateManyMutationInputObjectSchema, where: ArcadePrizeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateManyAndReturnArgs>;

export const ArcadePrizeUpdateManyAndReturnZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), data: ArcadePrizeUpdateManyMutationInputObjectSchema, where: ArcadePrizeWhereInputObjectSchema.optional() }).strict();