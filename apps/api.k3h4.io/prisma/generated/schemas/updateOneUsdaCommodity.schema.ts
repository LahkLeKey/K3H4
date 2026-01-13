import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityUpdateInputObjectSchema as UsdaCommodityUpdateInputObjectSchema } from './objects/UsdaCommodityUpdateInput.schema';
import { UsdaCommodityUncheckedUpdateInputObjectSchema as UsdaCommodityUncheckedUpdateInputObjectSchema } from './objects/UsdaCommodityUncheckedUpdateInput.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';

export const UsdaCommodityUpdateOneSchema: z.ZodType<Prisma.UsdaCommodityUpdateArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  data: z.union([UsdaCommodityUpdateInputObjectSchema, UsdaCommodityUncheckedUpdateInputObjectSchema]), where: UsdaCommodityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityUpdateArgs>;

export const UsdaCommodityUpdateOneZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  data: z.union([UsdaCommodityUpdateInputObjectSchema, UsdaCommodityUncheckedUpdateInputObjectSchema]), where: UsdaCommodityWhereUniqueInputObjectSchema }).strict();