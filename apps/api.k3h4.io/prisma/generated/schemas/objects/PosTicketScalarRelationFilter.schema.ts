import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PosTicketWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PosTicketWhereInputObjectSchema).optional()
}).strict();
export const PosTicketScalarRelationFilterObjectSchema: z.ZodType<Prisma.PosTicketScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketScalarRelationFilter>;
export const PosTicketScalarRelationFilterObjectZodSchema = makeSchema();
