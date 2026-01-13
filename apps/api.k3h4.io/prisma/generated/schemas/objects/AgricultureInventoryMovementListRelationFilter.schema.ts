import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './AgricultureInventoryMovementWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementListRelationFilter>;
export const AgricultureInventoryMovementListRelationFilterObjectZodSchema = makeSchema();
