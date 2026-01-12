import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotCreateInputObjectSchema as AgricultureSlotCreateInputObjectSchema } from './objects/AgricultureSlotCreateInput.schema';
import { AgricultureSlotUncheckedCreateInputObjectSchema as AgricultureSlotUncheckedCreateInputObjectSchema } from './objects/AgricultureSlotUncheckedCreateInput.schema';

export const AgricultureSlotCreateOneSchema: z.ZodType<Prisma.AgricultureSlotCreateArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), data: z.union([AgricultureSlotCreateInputObjectSchema, AgricultureSlotUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotCreateArgs>;

export const AgricultureSlotCreateOneZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), data: z.union([AgricultureSlotCreateInputObjectSchema, AgricultureSlotUncheckedCreateInputObjectSchema]) }).strict();