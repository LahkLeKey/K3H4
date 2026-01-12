import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedCreateManyInputObjectSchema as CulinarySupplierNeedCreateManyInputObjectSchema } from './objects/CulinarySupplierNeedCreateManyInput.schema';

export const CulinarySupplierNeedCreateManyAndReturnSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateManyAndReturnArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), data: z.union([ CulinarySupplierNeedCreateManyInputObjectSchema, z.array(CulinarySupplierNeedCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateManyAndReturnArgs>;

export const CulinarySupplierNeedCreateManyAndReturnZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), data: z.union([ CulinarySupplierNeedCreateManyInputObjectSchema, z.array(CulinarySupplierNeedCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();