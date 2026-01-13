import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './PosTicketInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PosTicketSelectObjectSchema).optional(),
  include: z.lazy(() => PosTicketIncludeObjectSchema).optional()
}).strict();
export const PosTicketArgsObjectSchema = makeSchema();
export const PosTicketArgsObjectZodSchema = makeSchema();
