import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeUpdateManyMutationInputObjectSchema as UsdaCommodityAttributeUpdateManyMutationInputObjectSchema } from './objects/UsdaCommodityAttributeUpdateManyMutationInput.schema';
import { UsdaCommodityAttributeWhereInputObjectSchema as UsdaCommodityAttributeWhereInputObjectSchema } from './objects/UsdaCommodityAttributeWhereInput.schema';

export const UsdaCommodityAttributeUpdateManySchema: z.ZodType<Prisma.UsdaCommodityAttributeUpdateManyArgs> = z.object({ data: UsdaCommodityAttributeUpdateManyMutationInputObjectSchema, where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeUpdateManyArgs>;

export const UsdaCommodityAttributeUpdateManyZodSchema = z.object({ data: UsdaCommodityAttributeUpdateManyMutationInputObjectSchema, where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict();