import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCountOutputTypeCountLineItemsArgsObjectSchema as PosTicketCountOutputTypeCountLineItemsArgsObjectSchema } from './PosTicketCountOutputTypeCountLineItemsArgs.schema'

const makeSchema = () => z.object({
  lineItems: z.union([z.boolean(), z.lazy(() => PosTicketCountOutputTypeCountLineItemsArgsObjectSchema)]).optional()
}).strict();
export const PosTicketCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PosTicketCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCountOutputTypeSelect>;
export const PosTicketCountOutputTypeSelectObjectZodSchema = makeSchema();
