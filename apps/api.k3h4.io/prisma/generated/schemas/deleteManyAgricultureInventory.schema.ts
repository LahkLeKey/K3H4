import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './objects/AgricultureInventoryWhereInput.schema';

export const AgricultureInventoryDeleteManySchema: z.ZodType<Prisma.AgricultureInventoryDeleteManyArgs> = z.object({ where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryDeleteManyArgs>;

export const AgricultureInventoryDeleteManyZodSchema = z.object({ where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict();