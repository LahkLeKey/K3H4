import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCountOutputTypeSelectObjectSchema as AgricultureShipmentCountOutputTypeSelectObjectSchema } from './AgricultureShipmentCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureShipmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AgricultureShipmentCountOutputTypeArgsObjectSchema = makeSchema();
export const AgricultureShipmentCountOutputTypeArgsObjectZodSchema = makeSchema();
