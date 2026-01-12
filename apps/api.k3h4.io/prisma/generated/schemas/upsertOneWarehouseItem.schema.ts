import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemCreateInputObjectSchema as WarehouseItemCreateInputObjectSchema } from './objects/WarehouseItemCreateInput.schema';
import { WarehouseItemUncheckedCreateInputObjectSchema as WarehouseItemUncheckedCreateInputObjectSchema } from './objects/WarehouseItemUncheckedCreateInput.schema';
import { WarehouseItemUpdateInputObjectSchema as WarehouseItemUpdateInputObjectSchema } from './objects/WarehouseItemUpdateInput.schema';
import { WarehouseItemUncheckedUpdateInputObjectSchema as WarehouseItemUncheckedUpdateInputObjectSchema } from './objects/WarehouseItemUncheckedUpdateInput.schema';

export const WarehouseItemUpsertOneSchema: z.ZodType<Prisma.WarehouseItemUpsertArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema, create: z.union([ WarehouseItemCreateInputObjectSchema, WarehouseItemUncheckedCreateInputObjectSchema ]), update: z.union([ WarehouseItemUpdateInputObjectSchema, WarehouseItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.WarehouseItemUpsertArgs>;

export const WarehouseItemUpsertOneZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), include: WarehouseItemIncludeObjectSchema.optional(), where: WarehouseItemWhereUniqueInputObjectSchema, create: z.union([ WarehouseItemCreateInputObjectSchema, WarehouseItemUncheckedCreateInputObjectSchema ]), update: z.union([ WarehouseItemUpdateInputObjectSchema, WarehouseItemUncheckedUpdateInputObjectSchema ]) }).strict();