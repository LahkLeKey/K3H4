import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './objects/ArcadeRedemptionWhereInput.schema';

export const ArcadeRedemptionDeleteManySchema: z.ZodType<Prisma.ArcadeRedemptionDeleteManyArgs> = z.object({ where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionDeleteManyArgs>;

export const ArcadeRedemptionDeleteManyZodSchema = z.object({ where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict();