import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedUpdateInputObjectSchema as CulinarySupplierNeedUpdateInputObjectSchema } from './objects/CulinarySupplierNeedUpdateInput.schema';
import { CulinarySupplierNeedUncheckedUpdateInputObjectSchema as CulinarySupplierNeedUncheckedUpdateInputObjectSchema } from './objects/CulinarySupplierNeedUncheckedUpdateInput.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './objects/CulinarySupplierNeedWhereUniqueInput.schema';

export const CulinarySupplierNeedUpdateOneSchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), data: z.union([CulinarySupplierNeedUpdateInputObjectSchema, CulinarySupplierNeedUncheckedUpdateInputObjectSchema]), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateArgs>;

export const CulinarySupplierNeedUpdateOneZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), data: z.union([CulinarySupplierNeedUpdateInputObjectSchema, CulinarySupplierNeedUncheckedUpdateInputObjectSchema]), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict();