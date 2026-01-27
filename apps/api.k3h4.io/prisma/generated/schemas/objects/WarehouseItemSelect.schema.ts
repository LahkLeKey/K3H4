import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { FreightLoadArgsObjectSchema as FreightLoadArgsObjectSchema } from './FreightLoadArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sku: z.boolean().optional(),
  description: z.boolean().optional(),
  quantity: z.boolean().optional(),
  location: z.boolean().optional(),
  status: z.boolean().optional(),
  freightLoadId: z.boolean().optional(),
  freightLoad: z.union([z.boolean(), z.lazy(() => FreightLoadArgsObjectSchema)]).optional(),
  category: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const WarehouseItemSelectObjectSchema: z.ZodType<Prisma.WarehouseItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemSelect>;
export const WarehouseItemSelectObjectZodSchema = makeSchema();
