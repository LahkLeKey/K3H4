import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemCreateInputObjectSchema as WarehouseItemCreateInputObjectSchema } from './objects/WarehouseItemCreateInput.schema';
import { WarehouseItemUncheckedCreateInputObjectSchema as WarehouseItemUncheckedCreateInputObjectSchema } from './objects/WarehouseItemUncheckedCreateInput.schema';

export const WarehouseItemCreateOneSchema: z.ZodType<Prisma.WarehouseItemCreateArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), data: z.union([WarehouseItemCreateInputObjectSchema, WarehouseItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.WarehouseItemCreateArgs>;

export const WarehouseItemCreateOneZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), data: z.union([WarehouseItemCreateInputObjectSchema, WarehouseItemUncheckedCreateInputObjectSchema]) }).strict();