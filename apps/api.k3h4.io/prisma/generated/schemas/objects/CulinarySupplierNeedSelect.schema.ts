import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  item: z.boolean().optional(),
  quantity: z.boolean().optional(),
  status: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const CulinarySupplierNeedSelectObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedSelect> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedSelect>;
export const CulinarySupplierNeedSelectObjectZodSchema = makeSchema();
