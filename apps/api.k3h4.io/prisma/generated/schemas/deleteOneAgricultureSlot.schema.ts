import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';

export const AgricultureSlotDeleteOneSchema: z.ZodType<Prisma.AgricultureSlotDeleteArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotDeleteArgs>;

export const AgricultureSlotDeleteOneZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict();