import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskUpdateInputObjectSchema as AgricultureTaskUpdateInputObjectSchema } from './objects/AgricultureTaskUpdateInput.schema';
import { AgricultureTaskUncheckedUpdateInputObjectSchema as AgricultureTaskUncheckedUpdateInputObjectSchema } from './objects/AgricultureTaskUncheckedUpdateInput.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';

export const AgricultureTaskUpdateOneSchema: z.ZodType<Prisma.AgricultureTaskUpdateArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), data: z.union([AgricultureTaskUpdateInputObjectSchema, AgricultureTaskUncheckedUpdateInputObjectSchema]), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateArgs>;

export const AgricultureTaskUpdateOneZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), data: z.union([AgricultureTaskUpdateInputObjectSchema, AgricultureTaskUncheckedUpdateInputObjectSchema]), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict();