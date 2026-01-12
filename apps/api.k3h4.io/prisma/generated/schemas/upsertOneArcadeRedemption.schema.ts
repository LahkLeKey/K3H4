import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './objects/ArcadeRedemptionInclude.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './objects/ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionCreateInputObjectSchema as ArcadeRedemptionCreateInputObjectSchema } from './objects/ArcadeRedemptionCreateInput.schema';
import { ArcadeRedemptionUncheckedCreateInputObjectSchema as ArcadeRedemptionUncheckedCreateInputObjectSchema } from './objects/ArcadeRedemptionUncheckedCreateInput.schema';
import { ArcadeRedemptionUpdateInputObjectSchema as ArcadeRedemptionUpdateInputObjectSchema } from './objects/ArcadeRedemptionUpdateInput.schema';
import { ArcadeRedemptionUncheckedUpdateInputObjectSchema as ArcadeRedemptionUncheckedUpdateInputObjectSchema } from './objects/ArcadeRedemptionUncheckedUpdateInput.schema';

export const ArcadeRedemptionUpsertOneSchema: z.ZodType<Prisma.ArcadeRedemptionUpsertArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), where: ArcadeRedemptionWhereUniqueInputObjectSchema, create: z.union([ ArcadeRedemptionCreateInputObjectSchema, ArcadeRedemptionUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeRedemptionUpdateInputObjectSchema, ArcadeRedemptionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpsertArgs>;

export const ArcadeRedemptionUpsertOneZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), include: ArcadeRedemptionIncludeObjectSchema.optional(), where: ArcadeRedemptionWhereUniqueInputObjectSchema, create: z.union([ ArcadeRedemptionCreateInputObjectSchema, ArcadeRedemptionUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeRedemptionUpdateInputObjectSchema, ArcadeRedemptionUncheckedUpdateInputObjectSchema ]) }).strict();