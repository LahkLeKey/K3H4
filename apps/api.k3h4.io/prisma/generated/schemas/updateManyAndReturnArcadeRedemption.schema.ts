import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionUpdateManyMutationInputObjectSchema as ArcadeRedemptionUpdateManyMutationInputObjectSchema } from './objects/ArcadeRedemptionUpdateManyMutationInput.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './objects/ArcadeRedemptionWhereInput.schema';

export const ArcadeRedemptionUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyAndReturnArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), data: ArcadeRedemptionUpdateManyMutationInputObjectSchema, where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyAndReturnArgs>;

export const ArcadeRedemptionUpdateManyAndReturnZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), data: ArcadeRedemptionUpdateManyMutationInputObjectSchema, where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict();