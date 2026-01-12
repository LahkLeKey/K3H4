import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './objects/AgricultureResourceWhereInput.schema';

export const AgricultureResourceDeleteManySchema: z.ZodType<Prisma.AgricultureResourceDeleteManyArgs> = z.object({ where: AgricultureResourceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceDeleteManyArgs>;

export const AgricultureResourceDeleteManyZodSchema = z.object({ where: AgricultureResourceWhereInputObjectSchema.optional() }).strict();