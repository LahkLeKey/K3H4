import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PosTicketWhereInputObjectSchema).optional(),
  some: z.lazy(() => PosTicketWhereInputObjectSchema).optional(),
  none: z.lazy(() => PosTicketWhereInputObjectSchema).optional()
}).strict();
export const PosTicketListRelationFilterObjectSchema: z.ZodType<Prisma.PosTicketListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketListRelationFilter>;
export const PosTicketListRelationFilterObjectZodSchema = makeSchema();
