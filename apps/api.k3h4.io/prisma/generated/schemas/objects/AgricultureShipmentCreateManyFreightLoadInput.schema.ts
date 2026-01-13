import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureShipmentCreateManyFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateManyFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyFreightLoadInput>;
export const AgricultureShipmentCreateManyFreightLoadInputObjectZodSchema = makeSchema();
