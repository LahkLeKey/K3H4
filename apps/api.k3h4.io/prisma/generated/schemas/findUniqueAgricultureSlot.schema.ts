import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';

export const AgricultureSlotFindUniqueSchema: z.ZodType<Prisma.AgricultureSlotFindUniqueArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotFindUniqueArgs>;

export const AgricultureSlotFindUniqueZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema }).strict();