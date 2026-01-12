import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { FreightLoadNullableScalarRelationFilterObjectSchema as FreightLoadNullableScalarRelationFilterObjectSchema } from './FreightLoadNullableScalarRelationFilter.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema';
import { AgricultureInventoryMovementListRelationFilterObjectSchema as AgricultureInventoryMovementListRelationFilterObjectSchema } from './AgricultureInventoryMovementListRelationFilter.schema'

const agricultureshipmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureShipmentWhereInputObjectSchema), z.lazy(() => AgricultureShipmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureShipmentWhereInputObjectSchema), z.lazy(() => AgricultureShipmentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  destination: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  mode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  eta: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  freightLoadId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  freightLoad: z.union([z.lazy(() => FreightLoadNullableScalarRelationFilterObjectSchema), z.lazy(() => FreightLoadWhereInputObjectSchema)]).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementListRelationFilterObjectSchema).optional()
}).strict();
export const AgricultureShipmentWhereInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentWhereInput> = agricultureshipmentwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureShipmentWhereInput>;
export const AgricultureShipmentWhereInputObjectZodSchema = agricultureshipmentwhereinputSchema;
