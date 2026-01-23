import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeUpdateInputObjectSchema as UsdaCommodityAttributeUpdateInputObjectSchema } from './objects/UsdaCommodityAttributeUpdateInput.schema';
import { UsdaCommodityAttributeUncheckedUpdateInputObjectSchema as UsdaCommodityAttributeUncheckedUpdateInputObjectSchema } from './objects/UsdaCommodityAttributeUncheckedUpdateInput.schema';
import { UsdaCommodityAttributeWhereUniqueInputObjectSchema as UsdaCommodityAttributeWhereUniqueInputObjectSchema } from './objects/UsdaCommodityAttributeWhereUniqueInput.schema';

export const UsdaCommodityAttributeUpdateOneSchema: z.ZodType<Prisma.UsdaCommodityAttributeUpdateArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  data: z.union([UsdaCommodityAttributeUpdateInputObjectSchema, UsdaCommodityAttributeUncheckedUpdateInputObjectSchema]), where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeUpdateArgs>;

export const UsdaCommodityAttributeUpdateOneZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  data: z.union([UsdaCommodityAttributeUpdateInputObjectSchema, UsdaCommodityAttributeUncheckedUpdateInputObjectSchema]), where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict();