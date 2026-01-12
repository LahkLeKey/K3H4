import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './objects/ArcadePrizeWhereInput.schema';

export const ArcadePrizeDeleteManySchema: z.ZodType<Prisma.ArcadePrizeDeleteManyArgs> = z.object({ where: ArcadePrizeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeDeleteManyArgs>;

export const ArcadePrizeDeleteManyZodSchema = z.object({ where: ArcadePrizeWhereInputObjectSchema.optional() }).strict();