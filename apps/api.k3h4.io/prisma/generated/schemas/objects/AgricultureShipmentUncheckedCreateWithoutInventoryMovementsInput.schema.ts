import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput>;
export const AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
