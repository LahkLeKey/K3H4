import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './WarehouseItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => WarehouseItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => WarehouseItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => WarehouseItemWhereInputObjectSchema).optional()
}).strict();
export const WarehouseItemListRelationFilterObjectSchema: z.ZodType<Prisma.WarehouseItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemListRelationFilter>;
export const WarehouseItemListRelationFilterObjectZodSchema = makeSchema();
