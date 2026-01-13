import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './objects/PosStoreInclude.schema';
import { PosStoreUpdateInputObjectSchema as PosStoreUpdateInputObjectSchema } from './objects/PosStoreUpdateInput.schema';
import { PosStoreUncheckedUpdateInputObjectSchema as PosStoreUncheckedUpdateInputObjectSchema } from './objects/PosStoreUncheckedUpdateInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';

export const PosStoreUpdateOneSchema: z.ZodType<Prisma.PosStoreUpdateArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), data: z.union([PosStoreUpdateInputObjectSchema, PosStoreUncheckedUpdateInputObjectSchema]), where: PosStoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosStoreUpdateArgs>;

export const PosStoreUpdateOneZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), data: z.union([PosStoreUpdateInputObjectSchema, PosStoreUncheckedUpdateInputObjectSchema]), where: PosStoreWhereUniqueInputObjectSchema }).strict();