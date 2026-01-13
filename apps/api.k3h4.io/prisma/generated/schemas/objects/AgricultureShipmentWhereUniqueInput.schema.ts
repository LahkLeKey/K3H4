import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgricultureShipmentWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentWhereUniqueInput>;
export const AgricultureShipmentWhereUniqueInputObjectZodSchema = makeSchema();
