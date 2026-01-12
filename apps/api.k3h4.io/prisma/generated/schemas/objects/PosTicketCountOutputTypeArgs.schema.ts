import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCountOutputTypeSelectObjectSchema as PosTicketCountOutputTypeSelectObjectSchema } from './PosTicketCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PosTicketCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PosTicketCountOutputTypeArgsObjectSchema = makeSchema();
export const PosTicketCountOutputTypeArgsObjectZodSchema = makeSchema();
