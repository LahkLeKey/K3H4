import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PosStoreArgsObjectSchema as PosStoreArgsObjectSchema } from './PosStoreArgs.schema';
import { PosLineItemFindManySchema as PosLineItemFindManySchema } from '../findManyPosLineItem.schema';
import { PosTicketCountOutputTypeArgsObjectSchema as PosTicketCountOutputTypeArgsObjectSchema } from './PosTicketCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  store: z.union([z.boolean(), z.lazy(() => PosStoreArgsObjectSchema)]).optional(),
  lineItems: z.union([z.boolean(), z.lazy(() => PosLineItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PosTicketCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PosTicketIncludeObjectSchema: z.ZodType<Prisma.PosTicketInclude> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketInclude>;
export const PosTicketIncludeObjectZodSchema = makeSchema();
