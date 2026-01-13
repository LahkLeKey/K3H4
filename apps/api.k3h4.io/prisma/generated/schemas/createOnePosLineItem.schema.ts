import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './objects/PosLineItemInclude.schema';
import { PosLineItemCreateInputObjectSchema as PosLineItemCreateInputObjectSchema } from './objects/PosLineItemCreateInput.schema';
import { PosLineItemUncheckedCreateInputObjectSchema as PosLineItemUncheckedCreateInputObjectSchema } from './objects/PosLineItemUncheckedCreateInput.schema';

export const PosLineItemCreateOneSchema: z.ZodType<Prisma.PosLineItemCreateArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), data: z.union([PosLineItemCreateInputObjectSchema, PosLineItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PosLineItemCreateArgs>;

export const PosLineItemCreateOneZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), data: z.union([PosLineItemCreateInputObjectSchema, PosLineItemUncheckedCreateInputObjectSchema]) }).strict();