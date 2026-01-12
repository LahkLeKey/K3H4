import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './objects/WarehouseItemWhereInput.schema';

export const WarehouseItemDeleteManySchema: z.ZodType<Prisma.WarehouseItemDeleteManyArgs> = z.object({ where: WarehouseItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemDeleteManyArgs>;

export const WarehouseItemDeleteManyZodSchema = z.object({ where: WarehouseItemWhereInputObjectSchema.optional() }).strict();