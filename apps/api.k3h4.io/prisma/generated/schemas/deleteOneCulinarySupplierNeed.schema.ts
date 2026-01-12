import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './objects/CulinarySupplierNeedWhereUniqueInput.schema';

export const CulinarySupplierNeedDeleteOneSchema: z.ZodType<Prisma.CulinarySupplierNeedDeleteArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedDeleteArgs>;

export const CulinarySupplierNeedDeleteOneZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict();