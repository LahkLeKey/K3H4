import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './objects/PosLineItemInclude.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './objects/PosLineItemWhereUniqueInput.schema';

export const PosLineItemFindUniqueOrThrowSchema: z.ZodType<Prisma.PosLineItemFindUniqueOrThrowArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), where: PosLineItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosLineItemFindUniqueOrThrowArgs>;

export const PosLineItemFindUniqueOrThrowZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), include: PosLineItemIncludeObjectSchema.optional(), where: PosLineItemWhereUniqueInputObjectSchema }).strict();