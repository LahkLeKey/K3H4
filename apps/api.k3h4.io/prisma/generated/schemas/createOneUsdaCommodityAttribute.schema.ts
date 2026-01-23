import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeCreateInputObjectSchema as UsdaCommodityAttributeCreateInputObjectSchema } from './objects/UsdaCommodityAttributeCreateInput.schema';
import { UsdaCommodityAttributeUncheckedCreateInputObjectSchema as UsdaCommodityAttributeUncheckedCreateInputObjectSchema } from './objects/UsdaCommodityAttributeUncheckedCreateInput.schema';

export const UsdaCommodityAttributeCreateOneSchema: z.ZodType<Prisma.UsdaCommodityAttributeCreateArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  data: z.union([UsdaCommodityAttributeCreateInputObjectSchema, UsdaCommodityAttributeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeCreateArgs>;

export const UsdaCommodityAttributeCreateOneZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  data: z.union([UsdaCommodityAttributeCreateInputObjectSchema, UsdaCommodityAttributeUncheckedCreateInputObjectSchema]) }).strict();