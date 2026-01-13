import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './PosLineItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosLineItemWhereInputObjectSchema).optional()
}).strict();
export const PosTicketCountOutputTypeCountLineItemsArgsObjectSchema = makeSchema();
export const PosTicketCountOutputTypeCountLineItemsArgsObjectZodSchema = makeSchema();
