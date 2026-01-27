import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './objects/OllamaOperationInclude.schema';
import { OllamaOperationUpdateInputObjectSchema as OllamaOperationUpdateInputObjectSchema } from './objects/OllamaOperationUpdateInput.schema';
import { OllamaOperationUncheckedUpdateInputObjectSchema as OllamaOperationUncheckedUpdateInputObjectSchema } from './objects/OllamaOperationUncheckedUpdateInput.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './objects/OllamaOperationWhereUniqueInput.schema';

export const OllamaOperationUpdateOneSchema: z.ZodType<Prisma.OllamaOperationUpdateArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), data: z.union([OllamaOperationUpdateInputObjectSchema, OllamaOperationUncheckedUpdateInputObjectSchema]), where: OllamaOperationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OllamaOperationUpdateArgs>;

export const OllamaOperationUpdateOneZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), data: z.union([OllamaOperationUpdateInputObjectSchema, OllamaOperationUncheckedUpdateInputObjectSchema]), where: OllamaOperationWhereUniqueInputObjectSchema }).strict();