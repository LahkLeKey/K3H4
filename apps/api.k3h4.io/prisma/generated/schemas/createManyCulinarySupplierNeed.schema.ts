import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedCreateManyInputObjectSchema as CulinarySupplierNeedCreateManyInputObjectSchema } from './objects/CulinarySupplierNeedCreateManyInput.schema';

export const CulinarySupplierNeedCreateManySchema: z.ZodType<Prisma.CulinarySupplierNeedCreateManyArgs> = z.object({ data: z.union([ CulinarySupplierNeedCreateManyInputObjectSchema, z.array(CulinarySupplierNeedCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateManyArgs>;

export const CulinarySupplierNeedCreateManyZodSchema = z.object({ data: z.union([ CulinarySupplierNeedCreateManyInputObjectSchema, z.array(CulinarySupplierNeedCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();