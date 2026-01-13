import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketArgsObjectSchema as PosTicketArgsObjectSchema } from './PosTicketArgs.schema'

const makeSchema = () => z.object({
  ticket: z.union([z.boolean(), z.lazy(() => PosTicketArgsObjectSchema)]).optional()
}).strict();
export const PosLineItemIncludeObjectSchema: z.ZodType<Prisma.PosLineItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemInclude>;
export const PosLineItemIncludeObjectZodSchema = makeSchema();
