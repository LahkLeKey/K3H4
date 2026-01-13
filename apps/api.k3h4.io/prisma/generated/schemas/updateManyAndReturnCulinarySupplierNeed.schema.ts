import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './objects/CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedUpdateManyMutationInputObjectSchema as CulinarySupplierNeedUpdateManyMutationInputObjectSchema } from './objects/CulinarySupplierNeedUpdateManyMutationInput.schema';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './objects/CulinarySupplierNeedWhereInput.schema';

export const CulinarySupplierNeedUpdateManyAndReturnSchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateManyAndReturnArgs> = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), data: CulinarySupplierNeedUpdateManyMutationInputObjectSchema, where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateManyAndReturnArgs>;

export const CulinarySupplierNeedUpdateManyAndReturnZodSchema = z.object({ select: CulinarySupplierNeedSelectObjectSchema.optional(), data: CulinarySupplierNeedUpdateManyMutationInputObjectSchema, where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict();