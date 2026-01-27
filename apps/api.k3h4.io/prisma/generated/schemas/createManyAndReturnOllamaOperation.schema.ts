import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationCreateManyInputObjectSchema as OllamaOperationCreateManyInputObjectSchema } from './objects/OllamaOperationCreateManyInput.schema';

export const OllamaOperationCreateManyAndReturnSchema: z.ZodType<Prisma.OllamaOperationCreateManyAndReturnArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), data: z.union([ OllamaOperationCreateManyInputObjectSchema, z.array(OllamaOperationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationCreateManyAndReturnArgs>;

export const OllamaOperationCreateManyAndReturnZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), data: z.union([ OllamaOperationCreateManyInputObjectSchema, z.array(OllamaOperationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();