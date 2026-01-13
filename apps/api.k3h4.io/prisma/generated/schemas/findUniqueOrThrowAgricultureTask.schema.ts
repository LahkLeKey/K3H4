import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';

export const AgricultureTaskFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureTaskFindUniqueOrThrowArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskFindUniqueOrThrowArgs>;

export const AgricultureTaskFindUniqueOrThrowZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema }).strict();