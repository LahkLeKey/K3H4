import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemUpdateManyMutationInputObjectSchema as WarehouseItemUpdateManyMutationInputObjectSchema } from './objects/WarehouseItemUpdateManyMutationInput.schema';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './objects/WarehouseItemWhereInput.schema';

export const WarehouseItemUpdateManyAndReturnSchema: z.ZodType<Prisma.WarehouseItemUpdateManyAndReturnArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), data: WarehouseItemUpdateManyMutationInputObjectSchema, where: WarehouseItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemUpdateManyAndReturnArgs>;

export const WarehouseItemUpdateManyAndReturnZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), data: WarehouseItemUpdateManyMutationInputObjectSchema, where: WarehouseItemWhereInputObjectSchema.optional() }).strict();