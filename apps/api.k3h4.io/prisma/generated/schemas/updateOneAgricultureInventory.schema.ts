import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryUpdateInputObjectSchema as AgricultureInventoryUpdateInputObjectSchema } from './objects/AgricultureInventoryUpdateInput.schema';
import { AgricultureInventoryUncheckedUpdateInputObjectSchema as AgricultureInventoryUncheckedUpdateInputObjectSchema } from './objects/AgricultureInventoryUncheckedUpdateInput.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryWhereUniqueInput.schema';

export const AgricultureInventoryUpdateOneSchema: z.ZodType<Prisma.AgricultureInventoryUpdateArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryUpdateInputObjectSchema, AgricultureInventoryUncheckedUpdateInputObjectSchema]), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateArgs>;

export const AgricultureInventoryUpdateOneZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryUpdateInputObjectSchema, AgricultureInventoryUncheckedUpdateInputObjectSchema]), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict();