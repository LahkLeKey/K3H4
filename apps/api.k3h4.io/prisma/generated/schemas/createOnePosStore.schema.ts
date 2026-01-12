import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './objects/PosStoreInclude.schema';
import { PosStoreCreateInputObjectSchema as PosStoreCreateInputObjectSchema } from './objects/PosStoreCreateInput.schema';
import { PosStoreUncheckedCreateInputObjectSchema as PosStoreUncheckedCreateInputObjectSchema } from './objects/PosStoreUncheckedCreateInput.schema';

export const PosStoreCreateOneSchema: z.ZodType<Prisma.PosStoreCreateArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), data: z.union([PosStoreCreateInputObjectSchema, PosStoreUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PosStoreCreateArgs>;

export const PosStoreCreateOneZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), include: PosStoreIncludeObjectSchema.optional(), data: z.union([PosStoreCreateInputObjectSchema, PosStoreUncheckedCreateInputObjectSchema]) }).strict();