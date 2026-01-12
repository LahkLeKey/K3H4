import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PosTicketOrderByWithRelationInputObjectSchema as PosTicketOrderByWithRelationInputObjectSchema } from './PosTicketOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  ticketId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  ticket: z.lazy(() => PosTicketOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PosLineItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PosLineItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemOrderByWithRelationInput>;
export const PosLineItemOrderByWithRelationInputObjectZodSchema = makeSchema();
