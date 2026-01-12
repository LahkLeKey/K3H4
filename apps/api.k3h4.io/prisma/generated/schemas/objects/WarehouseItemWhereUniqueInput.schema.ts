import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const WarehouseItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.WarehouseItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemWhereUniqueInput>;
export const WarehouseItemWhereUniqueInputObjectZodSchema = makeSchema();
