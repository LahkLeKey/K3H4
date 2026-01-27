import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './objects/OllamaOperationInclude.schema';
import { OllamaOperationCreateInputObjectSchema as OllamaOperationCreateInputObjectSchema } from './objects/OllamaOperationCreateInput.schema';
import { OllamaOperationUncheckedCreateInputObjectSchema as OllamaOperationUncheckedCreateInputObjectSchema } from './objects/OllamaOperationUncheckedCreateInput.schema';

export const OllamaOperationCreateOneSchema: z.ZodType<Prisma.OllamaOperationCreateArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), data: z.union([OllamaOperationCreateInputObjectSchema, OllamaOperationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OllamaOperationCreateArgs>;

export const OllamaOperationCreateOneZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), data: z.union([OllamaOperationCreateInputObjectSchema, OllamaOperationUncheckedCreateInputObjectSchema]) }).strict();