import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeUpdateManyMutationInputObjectSchema as ArcadePrizeUpdateManyMutationInputObjectSchema } from './objects/ArcadePrizeUpdateManyMutationInput.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './objects/ArcadePrizeWhereInput.schema';

export const ArcadePrizeUpdateManySchema: z.ZodType<Prisma.ArcadePrizeUpdateManyArgs> = z.object({ data: ArcadePrizeUpdateManyMutationInputObjectSchema, where: ArcadePrizeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateManyArgs>;

export const ArcadePrizeUpdateManyZodSchema = z.object({ data: ArcadePrizeUpdateManyMutationInputObjectSchema, where: ArcadePrizeWhereInputObjectSchema.optional() }).strict();