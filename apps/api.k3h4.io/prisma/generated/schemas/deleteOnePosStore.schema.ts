import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './objects/PosStoreInclude.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';

export const PosStoreDeleteOneSchema: z.ZodType<Prisma.PosStoreDeleteArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), where: PosStoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosStoreDeleteArgs>;

export const PosStoreDeleteOneZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), where: PosStoreWhereUniqueInputObjectSchema }).strict();