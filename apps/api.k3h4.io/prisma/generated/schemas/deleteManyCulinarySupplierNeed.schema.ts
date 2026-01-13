import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './objects/CulinarySupplierNeedWhereInput.schema';

export const CulinarySupplierNeedDeleteManySchema: z.ZodType<Prisma.CulinarySupplierNeedDeleteManyArgs> = z.object({ where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedDeleteManyArgs>;

export const CulinarySupplierNeedDeleteManyZodSchema = z.object({ where: CulinarySupplierNeedWhereInputObjectSchema.optional() }).strict();