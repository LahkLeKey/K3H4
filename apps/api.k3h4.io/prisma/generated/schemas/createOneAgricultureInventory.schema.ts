import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryCreateInputObjectSchema as AgricultureInventoryCreateInputObjectSchema } from './objects/AgricultureInventoryCreateInput.schema';
import { AgricultureInventoryUncheckedCreateInputObjectSchema as AgricultureInventoryUncheckedCreateInputObjectSchema } from './objects/AgricultureInventoryUncheckedCreateInput.schema';

export const AgricultureInventoryCreateOneSchema: z.ZodType<Prisma.AgricultureInventoryCreateArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryCreateInputObjectSchema, AgricultureInventoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateArgs>;

export const AgricultureInventoryCreateOneZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryCreateInputObjectSchema, AgricultureInventoryUncheckedCreateInputObjectSchema]) }).strict();