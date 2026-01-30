import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './objects/OllamaOperationInclude.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './objects/OllamaOperationWhereUniqueInput.schema';

export const OllamaOperationFindUniqueSchema: z.ZodType<Prisma.OllamaOperationFindUniqueArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), where: OllamaOperationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OllamaOperationFindUniqueArgs>;

export const OllamaOperationFindUniqueZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), include: OllamaOperationIncludeObjectSchema.optional(), where: OllamaOperationWhereUniqueInputObjectSchema }).strict();