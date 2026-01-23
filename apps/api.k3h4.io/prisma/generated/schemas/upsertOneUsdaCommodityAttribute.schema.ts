import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeWhereUniqueInputObjectSchema as UsdaCommodityAttributeWhereUniqueInputObjectSchema } from './objects/UsdaCommodityAttributeWhereUniqueInput.schema';
import { UsdaCommodityAttributeCreateInputObjectSchema as UsdaCommodityAttributeCreateInputObjectSchema } from './objects/UsdaCommodityAttributeCreateInput.schema';
import { UsdaCommodityAttributeUncheckedCreateInputObjectSchema as UsdaCommodityAttributeUncheckedCreateInputObjectSchema } from './objects/UsdaCommodityAttributeUncheckedCreateInput.schema';
import { UsdaCommodityAttributeUpdateInputObjectSchema as UsdaCommodityAttributeUpdateInputObjectSchema } from './objects/UsdaCommodityAttributeUpdateInput.schema';
import { UsdaCommodityAttributeUncheckedUpdateInputObjectSchema as UsdaCommodityAttributeUncheckedUpdateInputObjectSchema } from './objects/UsdaCommodityAttributeUncheckedUpdateInput.schema';

export const UsdaCommodityAttributeUpsertOneSchema: z.ZodType<Prisma.UsdaCommodityAttributeUpsertArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema, create: z.union([ UsdaCommodityAttributeCreateInputObjectSchema, UsdaCommodityAttributeUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCommodityAttributeUpdateInputObjectSchema, UsdaCommodityAttributeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeUpsertArgs>;

export const UsdaCommodityAttributeUpsertOneZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema, create: z.union([ UsdaCommodityAttributeCreateInputObjectSchema, UsdaCommodityAttributeUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCommodityAttributeUpdateInputObjectSchema, UsdaCommodityAttributeUncheckedUpdateInputObjectSchema ]) }).strict();