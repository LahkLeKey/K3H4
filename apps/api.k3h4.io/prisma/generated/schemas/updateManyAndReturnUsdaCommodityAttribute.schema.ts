import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeUpdateManyMutationInputObjectSchema as UsdaCommodityAttributeUpdateManyMutationInputObjectSchema } from './objects/UsdaCommodityAttributeUpdateManyMutationInput.schema';
import { UsdaCommodityAttributeWhereInputObjectSchema as UsdaCommodityAttributeWhereInputObjectSchema } from './objects/UsdaCommodityAttributeWhereInput.schema';

export const UsdaCommodityAttributeUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaCommodityAttributeUpdateManyAndReturnArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(), data: UsdaCommodityAttributeUpdateManyMutationInputObjectSchema, where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeUpdateManyAndReturnArgs>;

export const UsdaCommodityAttributeUpdateManyAndReturnZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(), data: UsdaCommodityAttributeUpdateManyMutationInputObjectSchema, where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict();