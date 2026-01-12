import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemCreateManyInputObjectSchema as WarehouseItemCreateManyInputObjectSchema } from './objects/WarehouseItemCreateManyInput.schema';

export const WarehouseItemCreateManySchema: z.ZodType<Prisma.WarehouseItemCreateManyArgs> = z.object({ data: z.union([ WarehouseItemCreateManyInputObjectSchema, z.array(WarehouseItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyArgs>;

export const WarehouseItemCreateManyZodSchema = z.object({ data: z.union([ WarehouseItemCreateManyInputObjectSchema, z.array(WarehouseItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();