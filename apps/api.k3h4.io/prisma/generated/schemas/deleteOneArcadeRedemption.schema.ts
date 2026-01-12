import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './objects/ArcadeRedemptionInclude.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './objects/ArcadeRedemptionWhereUniqueInput.schema';

export const ArcadeRedemptionDeleteOneSchema: z.ZodType<Prisma.ArcadeRedemptionDeleteArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), where: ArcadeRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionDeleteArgs>;

export const ArcadeRedemptionDeleteOneZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), where: ArcadeRedemptionWhereUniqueInputObjectSchema }).strict();