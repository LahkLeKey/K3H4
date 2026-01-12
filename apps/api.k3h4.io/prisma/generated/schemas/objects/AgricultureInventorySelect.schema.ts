import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureInventoryMovementFindManySchema as AgricultureInventoryMovementFindManySchema } from '../findManyAgricultureInventoryMovement.schema';
import { AgricultureInventoryCountOutputTypeArgsObjectSchema as AgricultureInventoryCountOutputTypeArgsObjectSchema } from './AgricultureInventoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sku: z.boolean().optional(),
  description: z.boolean().optional(),
  totalQuantity: z.boolean().optional(),
  unit: z.boolean().optional(),
  location: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  movements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryMovementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureInventoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureInventorySelectObjectSchema: z.ZodType<Prisma.AgricultureInventorySelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventorySelect>;
export const AgricultureInventorySelectObjectZodSchema = makeSchema();
