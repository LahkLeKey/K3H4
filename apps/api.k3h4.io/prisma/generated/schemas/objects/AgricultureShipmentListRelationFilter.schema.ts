import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureShipmentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentListRelationFilter>;
export const AgricultureShipmentListRelationFilterObjectZodSchema = makeSchema();
