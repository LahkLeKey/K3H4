import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskCreateInputObjectSchema as AgricultureTaskCreateInputObjectSchema } from './objects/AgricultureTaskCreateInput.schema';
import { AgricultureTaskUncheckedCreateInputObjectSchema as AgricultureTaskUncheckedCreateInputObjectSchema } from './objects/AgricultureTaskUncheckedCreateInput.schema';

export const AgricultureTaskCreateOneSchema: z.ZodType<Prisma.AgricultureTaskCreateArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), data: z.union([AgricultureTaskCreateInputObjectSchema, AgricultureTaskUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskCreateArgs>;

export const AgricultureTaskCreateOneZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), data: z.union([AgricultureTaskCreateInputObjectSchema, AgricultureTaskUncheckedCreateInputObjectSchema]) }).strict();