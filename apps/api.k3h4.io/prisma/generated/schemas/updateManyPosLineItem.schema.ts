import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemUpdateManyMutationInputObjectSchema as PosLineItemUpdateManyMutationInputObjectSchema } from './objects/PosLineItemUpdateManyMutationInput.schema';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './objects/PosLineItemWhereInput.schema';

export const PosLineItemUpdateManySchema: z.ZodType<Prisma.PosLineItemUpdateManyArgs> = z.object({ data: PosLineItemUpdateManyMutationInputObjectSchema, where: PosLineItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemUpdateManyArgs>;

export const PosLineItemUpdateManyZodSchema = z.object({ data: PosLineItemUpdateManyMutationInputObjectSchema, where: PosLineItemWhereInputObjectSchema.optional() }).strict();