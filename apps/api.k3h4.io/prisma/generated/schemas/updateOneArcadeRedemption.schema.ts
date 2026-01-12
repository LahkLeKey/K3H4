import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './objects/ArcadeRedemptionInclude.schema';
import { ArcadeRedemptionUpdateInputObjectSchema as ArcadeRedemptionUpdateInputObjectSchema } from './objects/ArcadeRedemptionUpdateInput.schema';
import { ArcadeRedemptionUncheckedUpdateInputObjectSchema as ArcadeRedemptionUncheckedUpdateInputObjectSchema } from './objects/ArcadeRedemptionUncheckedUpdateInput.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './objects/ArcadeRedemptionWhereUniqueInput.schema';

export const ArcadeRedemptionUpdateOneSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), data: z.union([ArcadeRedemptionUpdateInputObjectSchema, ArcadeRedemptionUncheckedUpdateInputObjectSchema]), where: ArcadeRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateArgs>;

export const ArcadeRedemptionUpdateOneZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), data: z.union([ArcadeRedemptionUpdateInputObjectSchema, ArcadeRedemptionUncheckedUpdateInputObjectSchema]), where: ArcadeRedemptionWhereUniqueInputObjectSchema }).strict();