import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemUpdateInputObjectSchema as WarehouseItemUpdateInputObjectSchema } from './objects/WarehouseItemUpdateInput.schema';
import { WarehouseItemUncheckedUpdateInputObjectSchema as WarehouseItemUncheckedUpdateInputObjectSchema } from './objects/WarehouseItemUncheckedUpdateInput.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';

export const WarehouseItemUpdateOneSchema: z.ZodType<Prisma.WarehouseItemUpdateArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), data: z.union([WarehouseItemUpdateInputObjectSchema, WarehouseItemUncheckedUpdateInputObjectSchema]), where: WarehouseItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WarehouseItemUpdateArgs>;

export const WarehouseItemUpdateOneZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), data: z.union([WarehouseItemUpdateInputObjectSchema, WarehouseItemUncheckedUpdateInputObjectSchema]), where: WarehouseItemWhereUniqueInputObjectSchema }).strict();