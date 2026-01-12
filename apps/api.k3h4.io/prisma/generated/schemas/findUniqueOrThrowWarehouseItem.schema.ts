import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';

export const WarehouseItemFindUniqueOrThrowSchema: z.ZodType<Prisma.WarehouseItemFindUniqueOrThrowArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WarehouseItemFindUniqueOrThrowArgs>;

export const WarehouseItemFindUniqueOrThrowZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema }).strict();