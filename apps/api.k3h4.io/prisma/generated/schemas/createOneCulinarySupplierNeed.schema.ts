import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedCreateInputObjectSchema as CulinarySupplierNeedCreateInputObjectSchema } from './objects/CulinarySupplierNeedCreateInput.schema';
import { CulinarySupplierNeedUncheckedCreateInputObjectSchema as CulinarySupplierNeedUncheckedCreateInputObjectSchema } from './objects/CulinarySupplierNeedUncheckedCreateInput.schema';

export const CulinarySupplierNeedCreateOneSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), data: z.union([CulinarySupplierNeedCreateInputObjectSchema, CulinarySupplierNeedUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateArgs>;

export const CulinarySupplierNeedCreateOneZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), data: z.union([CulinarySupplierNeedCreateInputObjectSchema, CulinarySupplierNeedUncheckedCreateInputObjectSchema]) }).strict();