import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotUpdateManyMutationInputObjectSchema as AgricultureSlotUpdateManyMutationInputObjectSchema } from './objects/AgricultureSlotUpdateManyMutationInput.schema';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './objects/AgricultureSlotWhereInput.schema';

export const AgricultureSlotUpdateManySchema: z.ZodType<Prisma.AgricultureSlotUpdateManyArgs> = z.object({ data: AgricultureSlotUpdateManyMutationInputObjectSchema, where: AgricultureSlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateManyArgs>;

export const AgricultureSlotUpdateManyZodSchema = z.object({ data: AgricultureSlotUpdateManyMutationInputObjectSchema, where: AgricultureSlotWhereInputObjectSchema.optional() }).strict();