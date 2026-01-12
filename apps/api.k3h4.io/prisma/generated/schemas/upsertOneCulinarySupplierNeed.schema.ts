import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './objects/CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedCreateInputObjectSchema as CulinarySupplierNeedCreateInputObjectSchema } from './objects/CulinarySupplierNeedCreateInput.schema';
import { CulinarySupplierNeedUncheckedCreateInputObjectSchema as CulinarySupplierNeedUncheckedCreateInputObjectSchema } from './objects/CulinarySupplierNeedUncheckedCreateInput.schema';
import { CulinarySupplierNeedUpdateInputObjectSchema as CulinarySupplierNeedUpdateInputObjectSchema } from './objects/CulinarySupplierNeedUpdateInput.schema';
import { CulinarySupplierNeedUncheckedUpdateInputObjectSchema as CulinarySupplierNeedUncheckedUpdateInputObjectSchema } from './objects/CulinarySupplierNeedUncheckedUpdateInput.schema';

export const CulinarySupplierNeedUpsertOneSchema: z.ZodType<Prisma.CulinarySupplierNeedUpsertArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema, create: z.union([ CulinarySupplierNeedCreateInputObjectSchema, CulinarySupplierNeedUncheckedCreateInputObjectSchema ]), update: z.union([ CulinarySupplierNeedUpdateInputObjectSchema, CulinarySupplierNeedUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpsertArgs>;

export const CulinarySupplierNeedUpsertOneZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), include: CulinarySupplierNeedIncludeObjectSchema.optional(), where: CulinarySupplierNeedWhereUniqueInputObjectSchema, create: z.union([ CulinarySupplierNeedCreateInputObjectSchema, CulinarySupplierNeedUncheckedCreateInputObjectSchema ]), update: z.union([ CulinarySupplierNeedUpdateInputObjectSchema, CulinarySupplierNeedUncheckedUpdateInputObjectSchema ]) }).strict();