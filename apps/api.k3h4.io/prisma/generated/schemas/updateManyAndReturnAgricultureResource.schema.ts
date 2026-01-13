import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceUpdateManyMutationInputObjectSchema as AgricultureResourceUpdateManyMutationInputObjectSchema } from './objects/AgricultureResourceUpdateManyMutationInput.schema';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './objects/AgricultureResourceWhereInput.schema';

export const AgricultureResourceUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureResourceUpdateManyAndReturnArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), data: AgricultureResourceUpdateManyMutationInputObjectSchema, where: AgricultureResourceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateManyAndReturnArgs>;

export const AgricultureResourceUpdateManyAndReturnZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), data: AgricultureResourceUpdateManyMutationInputObjectSchema, where: AgricultureResourceWhereInputObjectSchema.optional() }).strict();