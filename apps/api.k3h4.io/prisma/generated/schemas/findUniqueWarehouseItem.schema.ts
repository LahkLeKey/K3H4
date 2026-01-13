import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';

export const WarehouseItemFindUniqueSchema: z.ZodType<Prisma.WarehouseItemFindUniqueArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WarehouseItemFindUniqueArgs>;

export const WarehouseItemFindUniqueZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema }).strict();