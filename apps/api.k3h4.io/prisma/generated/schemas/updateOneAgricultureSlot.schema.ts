import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotUpdateInputObjectSchema as AgricultureSlotUpdateInputObjectSchema } from './objects/AgricultureSlotUpdateInput.schema';
import { AgricultureSlotUncheckedUpdateInputObjectSchema as AgricultureSlotUncheckedUpdateInputObjectSchema } from './objects/AgricultureSlotUncheckedUpdateInput.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';

export const AgricultureSlotUpdateOneSchema: z.ZodType<Prisma.AgricultureSlotUpdateArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), data: z.union([AgricultureSlotUpdateInputObjectSchema, AgricultureSlotUncheckedUpdateInputObjectSchema]), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateArgs>;

export const AgricultureSlotUpdateOneZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), data: z.union([AgricultureSlotUpdateInputObjectSchema, AgricultureSlotUncheckedUpdateInputObjectSchema]), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict();