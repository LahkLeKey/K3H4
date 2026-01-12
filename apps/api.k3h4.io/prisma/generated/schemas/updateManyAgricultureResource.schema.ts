import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceUpdateManyMutationInputObjectSchema as AgricultureResourceUpdateManyMutationInputObjectSchema } from './objects/AgricultureResourceUpdateManyMutationInput.schema';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './objects/AgricultureResourceWhereInput.schema';

export const AgricultureResourceUpdateManySchema: z.ZodType<Prisma.AgricultureResourceUpdateManyArgs> = z.object({ data: AgricultureResourceUpdateManyMutationInputObjectSchema, where: AgricultureResourceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateManyArgs>;

export const AgricultureResourceUpdateManyZodSchema = z.object({ data: AgricultureResourceUpdateManyMutationInputObjectSchema, where: AgricultureResourceWhereInputObjectSchema.optional() }).strict();