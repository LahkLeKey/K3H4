import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './objects/PosLineItemWhereInput.schema';

export const PosLineItemDeleteManySchema: z.ZodType<Prisma.PosLineItemDeleteManyArgs> = z.object({ where: PosLineItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemDeleteManyArgs>;

export const PosLineItemDeleteManyZodSchema = z.object({ where: PosLineItemWhereInputObjectSchema.optional() }).strict();