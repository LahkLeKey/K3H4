import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskUpdateManyMutationInputObjectSchema as AgricultureTaskUpdateManyMutationInputObjectSchema } from './objects/AgricultureTaskUpdateManyMutationInput.schema';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';

export const AgricultureTaskUpdateManySchema: z.ZodType<Prisma.AgricultureTaskUpdateManyArgs> = z.object({ data: AgricultureTaskUpdateManyMutationInputObjectSchema, where: AgricultureTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyArgs>;

export const AgricultureTaskUpdateManyZodSchema = z.object({ data: AgricultureTaskUpdateManyMutationInputObjectSchema, where: AgricultureTaskWhereInputObjectSchema.optional() }).strict();