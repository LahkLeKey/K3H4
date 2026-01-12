import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PosTicketFindManySchema as PosTicketFindManySchema } from '../findManyPosTicket.schema';
import { PosStoreCountOutputTypeArgsObjectSchema as PosStoreCountOutputTypeArgsObjectSchema } from './PosStoreCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  tickets: z.union([z.boolean(), z.lazy(() => PosTicketFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PosStoreCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PosStoreIncludeObjectSchema: z.ZodType<Prisma.PosStoreInclude> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreInclude>;
export const PosStoreIncludeObjectZodSchema = makeSchema();
