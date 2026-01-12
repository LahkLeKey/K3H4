import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryWhereUniqueInput.schema';

export const AgricultureInventoryDeleteOneSchema: z.ZodType<Prisma.AgricultureInventoryDeleteArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryDeleteArgs>;

export const AgricultureInventoryDeleteOneZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict();