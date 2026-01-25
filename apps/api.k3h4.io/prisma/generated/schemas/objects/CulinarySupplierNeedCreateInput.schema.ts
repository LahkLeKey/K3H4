import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateNestedOneWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateNestedOneWithoutCulinarySupplierNeedsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  item: z.string(),
  quantity: z.string(),
  status: LifecycleStatusSchema.optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCulinarySupplierNeedsInputObjectSchema)
}).strict();
export const CulinarySupplierNeedCreateInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateInput>;
export const CulinarySupplierNeedCreateInputObjectZodSchema = makeSchema();
