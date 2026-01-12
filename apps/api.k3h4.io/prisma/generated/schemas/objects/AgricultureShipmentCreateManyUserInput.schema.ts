import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureShipmentCreateManyUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyUserInput>;
export const AgricultureShipmentCreateManyUserInputObjectZodSchema = makeSchema();
