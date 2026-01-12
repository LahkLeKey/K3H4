import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionUpdateManyMutationInputObjectSchema as ArcadeRedemptionUpdateManyMutationInputObjectSchema } from './objects/ArcadeRedemptionUpdateManyMutationInput.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './objects/ArcadeRedemptionWhereInput.schema';

export const ArcadeRedemptionUpdateManySchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyArgs> = z.object({ data: ArcadeRedemptionUpdateManyMutationInputObjectSchema, where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyArgs>;

export const ArcadeRedemptionUpdateManyZodSchema = z.object({ data: ArcadeRedemptionUpdateManyMutationInputObjectSchema, where: ArcadeRedemptionWhereInputObjectSchema.optional() }).strict();