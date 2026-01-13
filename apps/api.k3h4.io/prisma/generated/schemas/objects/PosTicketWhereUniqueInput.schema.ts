import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PosTicketWhereUniqueInputObjectSchema: z.ZodType<Prisma.PosTicketWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketWhereUniqueInput>;
export const PosTicketWhereUniqueInputObjectZodSchema = makeSchema();
