import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './objects/WarehouseItemSelect.schema';
import { WarehouseItemCreateManyInputObjectSchema as WarehouseItemCreateManyInputObjectSchema } from './objects/WarehouseItemCreateManyInput.schema';

export const WarehouseItemCreateManyAndReturnSchema: z.ZodType<Prisma.WarehouseItemCreateManyAndReturnArgs> = z.object({ select: WarehouseItemSelectObjectSchema.optional(), data: z.union([ WarehouseItemCreateManyInputObjectSchema, z.array(WarehouseItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyAndReturnArgs>;

export const WarehouseItemCreateManyAndReturnZodSchema = z.object({ select: WarehouseItemSelectObjectSchema.optional(), data: z.union([ WarehouseItemCreateManyInputObjectSchema, z.array(WarehouseItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();