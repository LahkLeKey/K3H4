import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountPosTicketsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountPosTicketsArgsObjectZodSchema = makeSchema();
