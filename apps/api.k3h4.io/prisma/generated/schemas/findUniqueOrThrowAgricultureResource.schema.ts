import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './objects/AgricultureResourceInclude.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './objects/AgricultureResourceWhereUniqueInput.schema';

export const AgricultureResourceFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureResourceFindUniqueOrThrowArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), where: AgricultureResourceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceFindUniqueOrThrowArgs>;

export const AgricultureResourceFindUniqueOrThrowZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), where: AgricultureResourceWhereUniqueInputObjectSchema }).strict();