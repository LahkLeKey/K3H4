import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional().nullable()
}).strict();
export const AgricultureShipmentNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureShipmentNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentNullableScalarRelationFilter>;
export const AgricultureShipmentNullableScalarRelationFilterObjectZodSchema = makeSchema();
