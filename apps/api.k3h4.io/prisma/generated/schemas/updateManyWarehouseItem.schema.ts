import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemUpdateManyMutationInputObjectSchema as WarehouseItemUpdateManyMutationInputObjectSchema } from './objects/WarehouseItemUpdateManyMutationInput.schema';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './objects/WarehouseItemWhereInput.schema';

export const WarehouseItemUpdateManySchema: z.ZodType<Prisma.WarehouseItemUpdateManyArgs> = z.object({ data: WarehouseItemUpdateManyMutationInputObjectSchema, where: WarehouseItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemUpdateManyArgs>;

export const WarehouseItemUpdateManyZodSchema = z.object({ data: WarehouseItemUpdateManyMutationInputObjectSchema, where: WarehouseItemWhereInputObjectSchema.optional() }).strict();