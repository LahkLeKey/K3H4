import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityCreateInputObjectSchema as UsdaCommodityCreateInputObjectSchema } from './objects/UsdaCommodityCreateInput.schema';
import { UsdaCommodityUncheckedCreateInputObjectSchema as UsdaCommodityUncheckedCreateInputObjectSchema } from './objects/UsdaCommodityUncheckedCreateInput.schema';

export const UsdaCommodityCreateOneSchema: z.ZodType<Prisma.UsdaCommodityCreateArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  data: z.union([UsdaCommodityCreateInputObjectSchema, UsdaCommodityUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityCreateArgs>;

export const UsdaCommodityCreateOneZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  data: z.union([UsdaCommodityCreateInputObjectSchema, UsdaCommodityUncheckedCreateInputObjectSchema]) }).strict();