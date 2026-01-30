import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';
import { AiInsightCreateInputObjectSchema as AiInsightCreateInputObjectSchema } from './objects/AiInsightCreateInput.schema';
import { AiInsightUncheckedCreateInputObjectSchema as AiInsightUncheckedCreateInputObjectSchema } from './objects/AiInsightUncheckedCreateInput.schema';
import { AiInsightUpdateInputObjectSchema as AiInsightUpdateInputObjectSchema } from './objects/AiInsightUpdateInput.schema';
import { AiInsightUncheckedUpdateInputObjectSchema as AiInsightUncheckedUpdateInputObjectSchema } from './objects/AiInsightUncheckedUpdateInput.schema';

export const AiInsightUpsertOneSchema: z.ZodType<Prisma.AiInsightUpsertArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema, create: z.union([ AiInsightCreateInputObjectSchema, AiInsightUncheckedCreateInputObjectSchema ]), update: z.union([ AiInsightUpdateInputObjectSchema, AiInsightUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AiInsightUpsertArgs>;

export const AiInsightUpsertOneZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema, create: z.union([ AiInsightCreateInputObjectSchema, AiInsightUncheckedCreateInputObjectSchema ]), update: z.union([ AiInsightUpdateInputObjectSchema, AiInsightUncheckedUpdateInputObjectSchema ]) }).strict();