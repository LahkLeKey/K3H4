import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemUpdateManyMutationInputObjectSchema as PosLineItemUpdateManyMutationInputObjectSchema } from './objects/PosLineItemUpdateManyMutationInput.schema';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './objects/PosLineItemWhereInput.schema';

export const PosLineItemUpdateManyAndReturnSchema: z.ZodType<Prisma.PosLineItemUpdateManyAndReturnArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), data: PosLineItemUpdateManyMutationInputObjectSchema, where: PosLineItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemUpdateManyAndReturnArgs>;

export const PosLineItemUpdateManyAndReturnZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), data: PosLineItemUpdateManyMutationInputObjectSchema, where: PosLineItemWhereInputObjectSchema.optional() }).strict();