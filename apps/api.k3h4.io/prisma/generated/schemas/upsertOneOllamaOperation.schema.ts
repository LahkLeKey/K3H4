import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './objects/OllamaOperationInclude.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './objects/OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationCreateInputObjectSchema as OllamaOperationCreateInputObjectSchema } from './objects/OllamaOperationCreateInput.schema';
import { OllamaOperationUncheckedCreateInputObjectSchema as OllamaOperationUncheckedCreateInputObjectSchema } from './objects/OllamaOperationUncheckedCreateInput.schema';
import { OllamaOperationUpdateInputObjectSchema as OllamaOperationUpdateInputObjectSchema } from './objects/OllamaOperationUpdateInput.schema';
import { OllamaOperationUncheckedUpdateInputObjectSchema as OllamaOperationUncheckedUpdateInputObjectSchema } from './objects/OllamaOperationUncheckedUpdateInput.schema';

export const OllamaOperationUpsertOneSchema: z.ZodType<Prisma.OllamaOperationUpsertArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), where: OllamaOperationWhereUniqueInputObjectSchema, create: z.union([ OllamaOperationCreateInputObjectSchema, OllamaOperationUncheckedCreateInputObjectSchema ]), update: z.union([ OllamaOperationUpdateInputObjectSchema, OllamaOperationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OllamaOperationUpsertArgs>;

export const OllamaOperationUpsertOneZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), where: OllamaOperationWhereUniqueInputObjectSchema, create: z.union([ OllamaOperationCreateInputObjectSchema, OllamaOperationUncheckedCreateInputObjectSchema ]), update: z.union([ OllamaOperationUpdateInputObjectSchema, OllamaOperationUncheckedUpdateInputObjectSchema ]) }).strict();