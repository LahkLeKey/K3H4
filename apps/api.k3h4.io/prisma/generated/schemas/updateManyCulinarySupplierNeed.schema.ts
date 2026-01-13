import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedUpdateManyMutationInputObjectSchema as CulinarySupplierNeedUpdateManyMutationInputObjectSchema } from './objects/CulinarySupplierNeedUpdateManyMutationInput.schema';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './objects/CulinarySupplierNeedWhereInput.schema';

export const CulinarySupplierNeedUpdateManySchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateManyArgs> = z.object({ data: CulinarySupplierNeedUpdateManyMutationInputObjectSchema, where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateManyArgs>;

export const CulinarySupplierNeedUpdateManyZodSchema = z.object({ data: CulinarySupplierNeedUpdateManyMutationInputObjectSchema, where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict();