import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './objects/ArcadeRedemptionInclude.schema';
import { ArcadeRedemptionCreateInputObjectSchema as ArcadeRedemptionCreateInputObjectSchema } from './objects/ArcadeRedemptionCreateInput.schema';
import { ArcadeRedemptionUncheckedCreateInputObjectSchema as ArcadeRedemptionUncheckedCreateInputObjectSchema } from './objects/ArcadeRedemptionUncheckedCreateInput.schema';

export const ArcadeRedemptionCreateOneSchema: z.ZodType<Prisma.ArcadeRedemptionCreateArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), data: z.union([ArcadeRedemptionCreateInputObjectSchema, ArcadeRedemptionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateArgs>;

export const ArcadeRedemptionCreateOneZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), data: z.union([ArcadeRedemptionCreateInputObjectSchema, ArcadeRedemptionUncheckedCreateInputObjectSchema]) }).strict();