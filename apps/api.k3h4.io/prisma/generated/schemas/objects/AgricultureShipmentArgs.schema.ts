import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './AgricultureShipmentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureShipmentSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureShipmentIncludeObjectSchema).optional()
}).strict();
export const AgricultureShipmentArgsObjectSchema = makeSchema();
export const AgricultureShipmentArgsObjectZodSchema = makeSchema();
