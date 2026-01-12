import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  balanceAfter: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const BankTransactionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BankTransactionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionOrderByWithRelationInput>;
export const BankTransactionOrderByWithRelationInputObjectZodSchema = makeSchema();
