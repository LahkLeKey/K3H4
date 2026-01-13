import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './objects/PosLineItemInclude.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './objects/PosLineItemWhereUniqueInput.schema';
import { PosLineItemCreateInputObjectSchema as PosLineItemCreateInputObjectSchema } from './objects/PosLineItemCreateInput.schema';
import { PosLineItemUncheckedCreateInputObjectSchema as PosLineItemUncheckedCreateInputObjectSchema } from './objects/PosLineItemUncheckedCreateInput.schema';
import { PosLineItemUpdateInputObjectSchema as PosLineItemUpdateInputObjectSchema } from './objects/PosLineItemUpdateInput.schema';
import { PosLineItemUncheckedUpdateInputObjectSchema as PosLineItemUncheckedUpdateInputObjectSchema } from './objects/PosLineItemUncheckedUpdateInput.schema';

export const PosLineItemUpsertOneSchema: z.ZodType<Prisma.PosLineItemUpsertArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), where: PosLineItemWhereUniqueInputObjectSchema, create: z.union([ PosLineItemCreateInputObjectSchema, PosLineItemUncheckedCreateInputObjectSchema ]), update: z.union([ PosLineItemUpdateInputObjectSchema, PosLineItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PosLineItemUpsertArgs>;

export const PosLineItemUpsertOneZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), where: PosLineItemWhereUniqueInputObjectSchema, create: z.union([ PosLineItemCreateInputObjectSchema, PosLineItemUncheckedCreateInputObjectSchema ]), update: z.union([ PosLineItemUpdateInputObjectSchema, PosLineItemUncheckedUpdateInputObjectSchema ]) }).strict();