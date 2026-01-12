import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';

export const AgricultureTaskFindUniqueSchema: z.ZodType<Prisma.AgricultureTaskFindUniqueArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskFindUniqueArgs>;

export const AgricultureTaskFindUniqueZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict();