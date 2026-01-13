import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './objects/AgricultureSlotWhereInput.schema';

export const AgricultureSlotDeleteManySchema: z.ZodType<Prisma.AgricultureSlotDeleteManyArgs> = z.object({ where: AgricultureSlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotDeleteManyArgs>;

export const AgricultureSlotDeleteManyZodSchema = z.object({ where: AgricultureSlotWhereInputObjectSchema.optional() }).strict();