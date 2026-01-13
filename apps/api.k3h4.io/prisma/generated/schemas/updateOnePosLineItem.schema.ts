import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './objects/PosLineItemInclude.schema';
import { PosLineItemUpdateInputObjectSchema as PosLineItemUpdateInputObjectSchema } from './objects/PosLineItemUpdateInput.schema';
import { PosLineItemUncheckedUpdateInputObjectSchema as PosLineItemUncheckedUpdateInputObjectSchema } from './objects/PosLineItemUncheckedUpdateInput.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './objects/PosLineItemWhereUniqueInput.schema';

export const PosLineItemUpdateOneSchema: z.ZodType<Prisma.PosLineItemUpdateArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), data: z.union([PosLineItemUpdateInputObjectSchema, PosLineItemUncheckedUpdateInputObjectSchema]), where: PosLineItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosLineItemUpdateArgs>;

export const PosLineItemUpdateOneZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), data: z.union([PosLineItemUpdateInputObjectSchema, PosLineItemUncheckedUpdateInputObjectSchema]), where: PosLineItemWhereUniqueInputObjectSchema }).strict();