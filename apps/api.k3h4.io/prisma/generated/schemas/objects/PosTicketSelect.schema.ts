import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PosStoreArgsObjectSchema as PosStoreArgsObjectSchema } from './PosStoreArgs.schema';
import { PosLineItemFindManySchema as PosLineItemFindManySchema } from '../findManyPosLineItem.schema';
import { PosTicketCountOutputTypeArgsObjectSchema as PosTicketCountOutputTypeArgsObjectSchema } from './PosTicketCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  storeId: z.boolean().optional(),
  store: z.union([z.boolean(), z.lazy(() => PosStoreArgsObjectSchema)]).optional(),
  total: z.boolean().optional(),
  itemsCount: z.boolean().optional(),
  channel: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  lineItems: z.union([z.boolean(), z.lazy(() => PosLineItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PosTicketCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PosTicketSelectObjectSchema: z.ZodType<Prisma.PosTicketSelect> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketSelect>;
export const PosTicketSelectObjectZodSchema = makeSchema();
