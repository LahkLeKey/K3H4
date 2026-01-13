import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './CulinarySupplierNeedWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).optional(),
  some: z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).optional(),
  none: z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).optional()
}).strict();
export const CulinarySupplierNeedListRelationFilterObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedListRelationFilter>;
export const CulinarySupplierNeedListRelationFilterObjectZodSchema = makeSchema();
