import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PosLineItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.PosLineItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemWhereUniqueInput>;
export const PosLineItemWhereUniqueInputObjectZodSchema = makeSchema();
