import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgricultureInventoryMovementWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementWhereUniqueInput>;
export const AgricultureInventoryMovementWhereUniqueInputObjectZodSchema = makeSchema();
