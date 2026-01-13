import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PosTicketFindManySchema as PosTicketFindManySchema } from '../findManyPosTicket.schema';
import { PosStoreCountOutputTypeArgsObjectSchema as PosStoreCountOutputTypeArgsObjectSchema } from './PosStoreCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  channel: z.boolean().optional(),
  tickets: z.union([z.boolean(), z.lazy(() => PosTicketFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => PosStoreCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PosStoreSelectObjectSchema: z.ZodType<Prisma.PosStoreSelect> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreSelect>;
export const PosStoreSelectObjectZodSchema = makeSchema();
