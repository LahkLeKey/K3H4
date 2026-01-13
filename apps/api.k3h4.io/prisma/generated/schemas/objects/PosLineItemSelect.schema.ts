import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketArgsObjectSchema as PosTicketArgsObjectSchema } from './PosTicketArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  ticketId: z.boolean().optional(),
  ticket: z.union([z.boolean(), z.lazy(() => PosTicketArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  price: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const PosLineItemSelectObjectSchema: z.ZodType<Prisma.PosLineItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemSelect>;
export const PosLineItemSelectObjectZodSchema = makeSchema();
