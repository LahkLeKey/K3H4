import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';

export const AgricultureTaskDeleteManySchema: z.ZodType<Prisma.AgricultureTaskDeleteManyArgs> = z.object({ where: AgricultureTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskDeleteManyArgs>;

export const AgricultureTaskDeleteManyZodSchema = z.object({ where: AgricultureTaskWhereInputObjectSchema.optional() }).strict();