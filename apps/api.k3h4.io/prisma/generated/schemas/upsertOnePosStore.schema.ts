import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './objects/PosStoreInclude.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';
import { PosStoreCreateInputObjectSchema as PosStoreCreateInputObjectSchema } from './objects/PosStoreCreateInput.schema';
import { PosStoreUncheckedCreateInputObjectSchema as PosStoreUncheckedCreateInputObjectSchema } from './objects/PosStoreUncheckedCreateInput.schema';
import { PosStoreUpdateInputObjectSchema as PosStoreUpdateInputObjectSchema } from './objects/PosStoreUpdateInput.schema';
import { PosStoreUncheckedUpdateInputObjectSchema as PosStoreUncheckedUpdateInputObjectSchema } from './objects/PosStoreUncheckedUpdateInput.schema';

export const PosStoreUpsertOneSchema: z.ZodType<Prisma.PosStoreUpsertArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), where: PosStoreWhereUniqueInputObjectSchema, create: z.union([ PosStoreCreateInputObjectSchema, PosStoreUncheckedCreateInputObjectSchema ]), update: z.union([ PosStoreUpdateInputObjectSchema, PosStoreUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PosStoreUpsertArgs>;

export const PosStoreUpsertOneZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), where: PosStoreWhereUniqueInputObjectSchema, create: z.union([ PosStoreCreateInputObjectSchema, PosStoreUncheckedCreateInputObjectSchema ]), update: z.union([ PosStoreUpdateInputObjectSchema, PosStoreUncheckedUpdateInputObjectSchema ]) }).strict();