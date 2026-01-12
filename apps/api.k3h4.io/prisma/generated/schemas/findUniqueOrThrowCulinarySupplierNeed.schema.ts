import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './objects/CulinarySupplierNeedWhereUniqueInput.schema';

export const CulinarySupplierNeedFindUniqueOrThrowSchema: z.ZodType<Prisma.CulinarySupplierNeedFindUniqueOrThrowArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedFindUniqueOrThrowArgs>;

export const CulinarySupplierNeedFindUniqueOrThrowZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema }).strict();